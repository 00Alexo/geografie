import React, { useState, useEffect, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { formatDistanceToNow, format } from "date-fns";
import { ro } from "date-fns/locale";
import { useGetSubiect } from '../hooks/useGetSubiect';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { 
  FaClock, FaLock, FaImage, FaUser, 
  FaEdit, FaNotesMedical, FaBook, 
  FaTimes, FaTrash, FaPlus, FaSave, 
  FaArrowRight, FaCheck, FaSpinner, FaChevronDown, 
  FaFilePdf, FaPencilAlt, FaMobileAlt
} from 'react-icons/fa';

const ViewSubiect = () => {
    const {subiectId, materie} = useParams();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const [loading, setIsLoading] = useState(false);
    const [grading, setGrading] = useState(false);
    const [grade, setGrade] = useState(null);
    const [modalOpen, setModalOpen] = useState(null); 
    const [activeTab, setActiveTab] = useState('subiect'); // 'subiect' sau 'rezolvare'
    const [isMobile, setIsMobile] = useState(false);

    const [images, setImages] = useState([]);
    const [canvasImages, setCanvasImages] = useState([]);
    const [text, setText] = useState('');
    const [texts, setTexts] = useState([]);
    const [punctaje, setPunctaje] = useState([]);

    // Detectare dimensiune ecran
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        // Verifică inițial
        checkIfMobile();
        
        // Adaugă listener pentru redimensionare
        window.addEventListener('resize', checkIfMobile);
        
        // Curățare listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const getPunctaje = async() => {
        const response = await fetch(`${process.env.REACT_APP_API}/api/subiecte/getPunctaje/${subiectId}/${user.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            console.log(json);
            setPunctaje(json);
        }
    }

    const addToSubiect = async(type, rezolvare) => {
        const rezolvari = [{type: type, rezolvare: rezolvare}];
        const response = await fetch(`${process.env.REACT_APP_API}/api/subiecte/addToSubiect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                rezolvari,
                username: user.username,
                id: subiectId
            })
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            console.log(json);
        }
    }

    useEffect(() => {
        const fetchAndOrganizeRezolvari = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/subiecte/getRezolvariSubiect/${subiectId}/${user?.username}`, {
                method: 'GET',
            });
            
            if (!response.ok) {
              throw new Error('Eroare la încărcarea rezolvărilor');
            }
            
            const json = await response.json();
            
            let canvasTemp = [];
            let imageTemp = [];
            let textsTemp = [];
            
            json.forEach(item => {
              switch(item.type) {
                case 'canvas':
                  canvasTemp.push(item.rezolvare);
                  break;
                case 'image':
                  imageTemp.push(item.rezolvare);
                  break;
                case 'text':
                  textsTemp.push(item.rezolvare);
                  break;
                default:
                  console.warn('Tip rezolvare necunoscut:', item.type);
              }
            });

            setCanvasImages(canvasTemp);
            setImages(imageTemp);
            setTexts(textsTemp);
            
          } catch (error) {
            console.error('Eroare procesare rezolvari:', error);
          }
        };
      
        if (subiectId && user?.username) {
          fetchAndOrganizeRezolvari();
          getPunctaje();
        }
    }, [subiectId, user?.username]);

    const [materii] = useState(['informatica', 'matematica', 'logica', 'economie', 'geografie']);
    const { viewSubiect, subiect, error, isLoading, refetchSubiect } = useGetSubiect(subiectId);
    const timp = (createdAt) => {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ro });
    };
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const dragRef = useRef(null);
    const canvasRef = useRef(null);
    
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (!dragRef.current || e.target !== dragRef.current) return;
        setIsDragging(true);
        const rect = dragRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const modalElement = dragRef.current.parentElement;
        if (!modalElement) return;

        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        
        modalElement.style.left = `${x}px`;
        modalElement.style.top = `${y}px`;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleSaveCanvas = async () => {
        if (canvasRef.current) {
            const exportImage = await canvasRef.current.exportImage('png');
            addToSubiect('canvas', exportImage);
            setCanvasImages((prev) => [...prev, exportImage]);
            setModalOpen(null);
        }
    };

    const handleClearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        }
        setModalOpen(null);
    };

    const handleInsertImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                addToSubiect('image', reader.result);
                setImages((prevImages) => [...prevImages, reader.result]);
            };
        }
    };

    const openFilePicker = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => handleInsertImage(e.target.files[0]);
        input.click();
    };

    const handleSaveText = () => {
        if (!text.trim()) return;
        
        addToSubiect('text', text);
        setTexts((prevTexts) => [...prevTexts, text]);
        setText('');
        setModalOpen(null);
    }

    const handleCorectareSubiect = async () => {
        setGrading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/subiecte/gradeSubiect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    id: subiectId
                })
            });
            
            const json = await response.json();
            
            if(!response.ok){
                console.log(json.error);
            }
            
            if(response.ok){
                console.log(json);
                setGrade(json.punctaj);
                setTimeout(() => {
                  setGrading(false);
                  setGrade(null);
                }, 7000);
            }
        } catch (error) {
            console.error("Error grading subject:", error);
            setGrading(false);
        }
    }

    if(!materii.includes(materie.toLowerCase())){
        return <NotFound/>
    }

    return (
        <div className="relative min-h-[calc(100vh-80px)] bg-[#f0f2ff]">
            {/* Mobile Tabs */}
            {isMobile && (
                <div className="sticky top-0 z-40 bg-white flex shadow-md rounded-b-lg overflow-hidden">
                    <button 
                        onClick={() => setActiveTab('subiect')}
                        className={`flex-1 py-4 px-3 flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'subiect' 
                            ? 'bg-[#5F5FDF] text-white font-medium' 
                            : 'bg-gray-50 text-gray-600'
                        }`}
                    >
                        <FaFilePdf size={16} />
                        <span>Subiect</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('rezolvare')}
                        className={`flex-1 py-4 px-3 flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'rezolvare' 
                            ? 'bg-[#5F5FDF] text-white font-medium' 
                            : 'bg-gray-50 text-gray-600'
                        }`}
                    >
                        <FaPencilAlt size={16} />
                        <span>Rezolvare</span>
                    </button>
                </div>
            )}

            {/* Btn Punctaje - adaptat pentru mobile */}
            {punctaje && punctaje.length > 0 && (
                <button 
                    className={`${isMobile ? 'fixed bottom-20 right-4' : 'absolute right-4 top-4'} z-50 bg-[#5F5FDF] hover:bg-[#4F4FC5] text-white px-4 py-3 rounded-full shadow-md flex items-center gap-2 transition-colors duration-300`}
                    onClick={() => setModalOpen('punctaje')}
                >
                    <FaBook size={16} />
                    <span className={isMobile ? "sr-only" : ""}>Punctaje</span>
                </button>
            )}

            {/* Loading/Grading Overlay */}
            {grading && (
                <div className="fixed inset-0 bg-[#080531]/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center gap-6 max-w-md w-full mx-4 transform transition-all animate-fadeIn">
                        {!grade ? (
                            <>
                                <div className="w-16 h-16 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#5F5FDF] animate-spin"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-[#e0e4ff] opacity-30"></div>
                                </div>
                                <p className="text-gray-700 font-medium text-lg text-center">Se corectează subiectul...</p>
                                <p className="text-gray-500 text-sm text-center">Verificăm rezolvările tale cu ajutorul AI</p>
                            </>
                        ) : (
                            <>
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold
                                    ${grade < 50 ? 'bg-red-500' : grade >= 50 && grade < 90 ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                    {grade}
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-800 font-bold text-xl mb-2">Subiect corectat!</p>
                                    <p className="text-gray-600">
                                        {grade < 50 
                                            ? 'Mai ai nevoie de exercițiu. Continuă să lucrezi!' 
                                            : grade >= 50 && grade < 90 
                                                ? 'Bine! Ești pe drumul cel bun.' 
                                                : 'Excelent! Stăpânești foarte bine subiectul.'}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setGrading(false)}
                                    className="mt-4 bg-[#5F5FDF] hover:bg-[#4747A9] text-white px-6 py-2 rounded-lg transition-colors duration-200"
                                >
                                    Închide
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Textbox Modal */}
            {modalOpen === 'text' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Adaugă notițe</h3>
                            <button 
                                onClick={() => setModalOpen(null)} 
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>
                        <div className="mb-6">
                            <textarea
                                autoFocus
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Adaugă rezolvarea ta aici..."
                                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F5FDF] focus:border-transparent resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setModalOpen(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Anulează
                            </button>
                            <button 
                                onClick={handleSaveText}
                                className="px-4 py-2 bg-[#5F5FDF] hover:bg-[#4747A9] text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <FaSave size={14} />
                                <span>Salvează</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Whiteboard Modal */}
            {modalOpen === 'whiteboard' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
                    <div 
                        className="bg-white rounded-xl shadow-xl w-full max-w-6xl absolute"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        <div 
                            className="flex justify-between items-center p-4 border-b cursor-move bg-[#5F5FDF] text-white rounded-t-xl"
                            ref={dragRef}
                            onMouseDown={handleMouseDown}
                        >
                            <h3 className="text-lg font-bold">Whiteboard</h3>
                            <button 
                                onClick={() => setModalOpen(null)} 
                                className="text-white hover:text-gray-200"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>
                        <div className="p-4">
                            <ReactSketchCanvas
                                ref={canvasRef}
                                width="100%"
                                height={isMobile ? "40vh" : "60vh"}
                                strokeWidth={4}
                                strokeColor="black"
                                className="cursor-crosshair border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end flex-wrap gap-3 p-4 border-t">
                            <button 
                                onClick={() => setModalOpen('confirmClear')}
                                className="px-4 py-2 flex items-center gap-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <FaTrash size={14} />
                                <span>Șterge tot</span>
                            </button>
                            <button 
                                onClick={handleSaveCanvas}
                                className="px-4 py-2 bg-[#5F5FDF] hover:bg-[#4747A9] text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <FaSave size={14} />
                                <span>Salvează</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Clear Modal */}
            {modalOpen === 'confirmClear' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
                        <div className="mb-4 text-center">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <FaTrash className="text-red-500" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Confirmare ștergere</h3>
                            <p className="text-gray-600 mt-2">Sigur vrei să ștergi tot conținutul? Această acțiune nu poate fi anulată.</p>
                        </div>
                        <div className="flex justify-center gap-3 mt-6">
                            <button 
                                onClick={() => setModalOpen('whiteboard')}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Anulare
                            </button>
                            <button 
                                onClick={handleClearCanvas}
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                                Șterge
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Punctaje Modal */}
            {modalOpen === 'punctaje' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Istoricul evaluărilor</h3>
                            <button 
                                onClick={() => setModalOpen(null)} 
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-grow p-4">
                            {punctaje && punctaje.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {[...punctaje].reverse().map((evaluare, index) => (
                                        <div key={index} className="py-4 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                <div className="w-2 h-2 bg-[#5F5FDF] rounded-full"></div>
                                                <span>#{subiectId.substring(0, 8)}</span>
                                            </div>

                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-800">{user.username}</p>
                                                    <p className="text-sm text-gray-500">
                                                    {format(new Date(evaluare.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ro })}
                                                    </p>
                                                    <span className="inline-block mt-2 text-xs bg-[#e9e8ff] text-[#5F5FDF] px-2 py-1 rounded-full">
                                                    {evaluare.status || 'Evaluare finalizată'}
                                                    </span>
                                                </div>

                                                <div className={`
                                                    px-4 py-2 rounded-full text-base font-bold
                                                    ${evaluare.punctaj >= 90 ? 'bg-green-100 text-green-600' : 
                                                    evaluare.punctaj >= 50 ? 'bg-yellow-100 text-yellow-600' : 
                                                    'bg-red-100 text-red-500'}
                                                `}>
                                                    {evaluare.punctaj}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">Nu există evaluări înregistrate</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t">
                            <button 
                                onClick={() => setModalOpen(null)}
                                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                            >
                                Închide
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex flex-col md:flex-row ${isMobile ? 'h-[calc(100vh-132px)]' : 'h-[calc(100vh-80px)]'}`}>
                {/* PDF Viewer */}
                <div className={`${(isMobile && activeTab !== 'subiect') ? 'hidden' : 'block'} 
                    w-full lg:w-1/2 ${isMobile ? 'h-full' : 'h-full'} overflow-hidden bg-white shadow-md border-r border-gray-200`}>
                    {subiect && (
                        <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                            <Viewer
                                fileUrl={subiect}
                                plugins={[defaultLayoutPluginInstance]}
                            />
                        </Worker>
                    )}
                </div>

                {/* Right Panel - Hidden on Mobile when viewing Subiect */}
                <div className={`${(isMobile && activeTab !== 'rezolvare') ? 'hidden' : 'block'} 
                    w-full lg:w-1/2 flex flex-col h-full overflow-hidden`}>
                    {/* Mobile Info Bar - Afișat doar când suntem în tab-ul de rezolvare pe mobil */}
                    {(isMobile && activeTab === 'rezolvare') && (
                        <div className="bg-white p-3 border-b">
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer text-[#5F5FDF] font-medium list-none">
                                    <span>Informații subiect</span>
                                    <FaChevronDown size={14} className="transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-3 mt-2 bg-gray-50 rounded-lg">
                                    <h2 className="text-lg font-semibold text-[#2D2A6B] mb-2">
                                        {viewSubiect && `${viewSubiect.titlu.charAt(0).toUpperCase()}${viewSubiect.titlu.slice(1)}`}
                                    </h2>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Materie:</span> {viewSubiect?.materie}</p>
                                        <p><span className="font-medium">Profil:</span> {viewSubiect?.profil}</p>
                                        <p><span className="font-medium">Postat de:</span> {viewSubiect?.username}</p>
                                    </div>
                                </div>
                            </details>
                        </div>
                    )}

                    {/* Header - Pe desktop sau pe mobile când suntem în tab-ul de rezolvare */}
                    {(!isMobile || activeTab === 'rezolvare') && (
                        <div className='bg-white shadow-sm border-b p-5'>
                            <h1 className='text-xl md:text-2xl font-bold text-[#2D2A6B] mb-3'> 
                                {viewSubiect && `${viewSubiect.materie.charAt(0).toUpperCase()}${viewSubiect.materie.slice(1)} - ${viewSubiect.titlu.charAt(0).toUpperCase()}${viewSubiect.titlu.slice(1)}`}
                            </h1>
                            
                            <div className='flex flex-wrap gap-2 mb-3'>
                                {viewSubiect && viewSubiect.categorii && (() => {
                                    try {
                                        const categorii = typeof viewSubiect.categorii === 'string' ? 
                                            JSON.parse(viewSubiect.categorii) : viewSubiect.categorii;
                                        
                                        return Array.isArray(categorii) ? categorii.map((categorie, index) => (
                                            <span key={index} className='bg-[#e9e8ff] text-[#5F5FDF] px-3 py-1 rounded-full text-sm'>
                                                {categorie}
                                            </span>
                                        )) : null;
                                    } catch(e) {
                                        return null;
                                    }
                                })()}
                            </div>
                            
                            {!isMobile && (
                                <div className='flex flex-col sm:flex-row justify-between gap-3'>
                                    <div className='space-y-1.5'>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <span className='font-medium'>Descriere:</span> 
                                            <span>{viewSubiect?.descriere}</span>
                                        </p>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <FaUser size={14} className="text-[#5F5FDF]" /> 
                                            <span className='font-medium'>Postat de:</span>
                                            <span 
                                                onClick={() => navigate(`/profile/${viewSubiect?.username}`)}
                                                className='text-[#5F5FDF] hover:underline cursor-pointer'
                                            >
                                                {viewSubiect?.username}
                                            </span>
                                        </p>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <FaBook size={14} className="text-[#5F5FDF]" /> 
                                            <span className='font-medium'>Profil:</span> 
                                            <span>{viewSubiect?.profil}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Butoane Tools - Adaptate pentru mobile */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                <button 
                                    onClick={() => setModalOpen('text')}
                                    className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f2ff] hover:bg-[#e4e6ff] text-[#5F5FDF] rounded-lg transition-colors"
                                >
                                    <FaNotesMedical size={16} />
                                    <span>Adaugă notițe</span>
                                </button>
                                
                                <button 
                                    onClick={openFilePicker}
                                    className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f2ff] hover:bg-[#e4e6ff] text-[#5F5FDF] rounded-lg transition-colors"
                                >
                                    <FaImage size={16} />
                                    <span>Adaugă imagine</span>
                                </button>
                                
                                <button 
                                    onClick={() => setModalOpen('whiteboard')}
                                    className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f2ff] hover:bg-[#e4e6ff] text-[#5F5FDF] rounded-lg transition-colors"
                                >
                                    <FaEdit size={16} />
                                    <span>Whiteboard</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Content Section - adaptat pentru spațiere mai mare */}
                    <div className='flex-grow overflow-auto p-5 bg-[#f8f9ff]'>
                        {/* Solution Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                {
                                    type: 'images',
                                    title: 'Imagini',
                                    icon: <FaImage className="text-[#5F5FDF]" size={isMobile ? 16 : 20} />,
                                    count: images.length,
                                },
                                {
                                    type: 'text',
                                    title: 'Notițe',
                                    icon: <FaNotesMedical className="text-[#5F5FDF]" size={isMobile ? 16 : 20} />,
                                    count: texts.length,
                                },
                                {
                                    type: 'canvas',
                                    title: 'Schițe',
                                    icon: <FaEdit className="text-[#5F5FDF]" size={isMobile ? 16 : 20} />,
                                    count: canvasImages.length,
                                }
                            ].map((item) => (
                                <div key={item.type} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2">
                                    <div className={`w-${isMobile ? '10' : '12'} h-${isMobile ? '10' : '12'} bg-[#f0f2ff] rounded-full flex items-center justify-center mb-2`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-[#5F5FDF] font-medium">
                                        {item.count} {item.count === 1 ? 'element' : 'elemente'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Solutions Lists */}
                        {(images.length > 0 || texts.length > 0 || canvasImages.length > 0) && (
                            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Rezolvări salvate</h2>
                                
                                {/* Accordion style lists */}
                                {[
                                    { type: 'images', title: 'Imagini', items: images, setter: setImages },
                                    { type: 'text', title: 'Notițe', items: texts, setter: setTexts },
                                    { type: 'canvas', title: 'Schițe', items: canvasImages, setter: setCanvasImages }
                                ].map((section) => (
                                    section.items.length > 0 && (
                                        <div key={section.type} className="mb-4 last:mb-0 border border-gray-100 rounded-lg overflow-hidden">
                                            <details className="group">
                                                <summary className="flex justify-between items-center px-5 py-3 bg-gray-50 cursor-pointer list-none">
                                                    <div className="flex items-center gap-2">
                                                        {section.type === 'images' && <FaImage className="text-[#5F5FDF]" size={16} />}
                                                        {section.type === 'text' && <FaNotesMedical className="text-[#5F5FDF]" size={16} />}
                                                        {section.type === 'canvas' && <FaEdit className="text-[#5F5FDF]" size={16} />}
                                                        <span className="font-medium">{section.title} ({section.items.length})</span>
                                                    </div>
                                                    <FaChevronDown className="transition-transform group-open:rotate-180" />
                                                </summary>
                                                
                                                <div className="p-4 bg-white">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {section.items.map((item, index) => (
                                                            <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-3 flex justify-between items-center">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="bg-[#5F5FDF] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                                        {index + 1}
                                                                    </span>
                                                                    <span className="text-gray-700 truncate">
                                                                        {section.type === 'text' ? 
                                                                            (item.length > 30 ? item.substring(0, 30) + '...' : item) : 
                                                                            `Soluția #${index + 1}`
                                                                        }
                                                                    </span>
                                                                </div>
                                                                
                                                                <button 
                                                                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                                                                    onClick={() => section.setter(prev => prev.filter((_, i) => i !== index))}
                                                                >
                                                                    <FaTrash size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </details>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}

                        {/* Images preview cu spațiere mai mare și mai puține coloane pe mobile */}
                        {images.length > 0 && (
                            <div className="mb-7">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Previzualizare imagini</h3>
                                <div className={`grid grid-cols-1 ${isMobile ? '' : 'sm:grid-cols-2'} gap-4`}>
                                    {images.map((img, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                            <img 
                                                src={img} 
                                                alt={`Solutia ${idx + 1}`} 
                                                className="w-full h-auto" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Canvas preview */}
                        {canvasImages.length > 0 && (
                            <div className="mb-7">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Previzualizare schițe</h3>
                                <div className={`grid grid-cols-1 ${isMobile ? '' : 'sm:grid-cols-2'} gap-4`}>
                                    {canvasImages.map((img, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                            <img 
                                                src={img} 
                                                alt={`Schita ${idx + 1}`} 
                                                className="w-full h-auto" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Text preview */}
                        {texts.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notițele tale</h3>
                                <div className="space-y-4">
                                    {texts.map((txt, idx) => (
                                        <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-[#5F5FDF]">Notița #{idx + 1}</span>
                                            </div>
                                            <p className="text-gray-700 whitespace-pre-wrap">{txt}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Extra space for mobile fixed button */}
                        {isMobile && <div className="h-16"></div>}
                    </div>

                    {/* Footer - Vizibil doar pe desktop */}
                    {!isMobile && (
                        <div className="p-4 border-t bg-white">
                            <button 
                                onClick={handleCorectareSubiect}
                                disabled={grading}
                                className={`w-full py-3 rounded-xl bg-gradient-to-r from-[#5F5FDF] to-[#7676FF] text-white text-lg font-semibold 
                                    shadow-lg hover:shadow-[#5F5FDF]/30 transition-all flex items-center justify-center gap-2
                                    ${grading ? 'opacity-70 cursor-not-allowed' : 'hover:translate-y-[-2px]'}`}
                            >
                                {grading ? (
                                    <>
                                        <FaSpinner className="animate-spin" size={18} />
                                        Se procesează...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck size={18} />
                                        Corectează Subiectul
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Fixed Button pe Mobile */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
                    <button 
                        onClick={handleCorectareSubiect}
                        disabled={grading}
                        className={`w-full py-3 rounded-xl bg-gradient-to-r from-[#5F5FDF] to-[#7676FF] text-white font-semibold 
                            shadow-lg flex items-center justify-center gap-2
                            ${grading ? 'opacity-70 cursor-not-allowed' : 'active:translate-y-[-2px]'}`}
                    >
                        {grading ? (
                            <>
                                <FaSpinner className="animate-spin" size={18} />
                                Se procesează...
                            </>
                        ) : (
                            <>
                                <FaCheck size={18} />
                                Corectează Subiectul
                            </>
                        )}
                    </button>
                </div>
            )}
            
            {/* Indicator pentru mobile când suntem în tab-ul de subiect */}
            {(isMobile && activeTab === 'subiect') && (
                <div className="fixed bottom-20 left-4 bg-white/90 backdrop-blur-sm py-2 px-3 rounded-lg shadow-lg border border-gray-200 text-sm flex items-center gap-2">
                    <FaMobileAlt className="text-[#5F5FDF]" />
                    <span>Apasă pe "Rezolvare" pentru a lucra la subiect</span>
                </div>
            )}
        </div>
    );
}

export default ViewSubiect;