import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { FaBook, FaTimes, FaUser, FaCalendarAlt, FaEye, FaChevronRight, FaFilter } from 'react-icons/fa';

const Subiecte = () => {
    const { materie } = useParams();
    const navigate = useNavigate();
    const [subiecte, setSubiecte] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [materii] = useState(['informatica', 'matematica', 'logica', 'economie', 'psihologie', 'geografie']);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filtreProfil, setFiltreProfil] = useState([]);

    const getSubiecte = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/subiecte/getSubiecte?materie=${materie.toLowerCase()}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const json = await response.json();

            if (response.ok) {
                setSubiecte(json);
                // Extrage profilurile unice pentru filtrare
                const profiluri = [...new Set(json.map(s => s.profil))];
                setFiltreProfil(profiluri);
            } else {
                setError(json.error);
                setTimeout(() => {
                    setError(null);
                }, 7000);
            }
        } catch (err) {
            setError("Eroare la încărcarea subiectelor");
            setTimeout(() => {
                setError(null);
            }, 7000);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSubiecte();
    }, [materie]);

    if (!materii.includes(materie.toLowerCase())) {
        return <NotFound />
    }

    // Funcție pentru a transforma textul materiei într-un format mai prietenos
    const formatMaterieName = (name) => {
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        return capitalized;
    }

    return (
        <div className="bg-gradient-to-br from-[#f8f9ff] to-[#eef0ff] min-h-[calc(100vh-80px)]">
            {/* Hero section cu fundal decorativ */}
            <div className="relative overflow-hidden bg-[#4747A9] text-white">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-[#5F5FDF] rounded-full opacity-20"></div>
                    <div className="absolute bottom-5 right-20 w-40 h-40 bg-[#7676FF] rounded-full opacity-20"></div>
                    <div className="absolute top-20 right-40 w-16 h-16 bg-[#7676FF] rounded-full opacity-10"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        {formatMaterieName(materie)}
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl">
                        Explorează {subiecte.length} subiecte disponibile pentru această materie și îmbunătățește-ți înțelegerea conceptelor.
                    </p>
                </div>
            </div>
            
            {/* Indicator de eroare */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 mx-auto max-w-7xl rounded shadow-sm">
                    <div className="flex">
                        <div className="py-1">
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <p>{error}</p>
                    </div>
                </div>
            )}
            
            {/* Filtru și conținut principal */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Statistici și filtru */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <p className="text-gray-600">
                            {subiecte.length} subiecte disponibile
                        </p>
                    </div>
                    <button 
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-[#4747A9] mt-4 md:mt-0"
                    >
                        <FaFilter size={14} />
                        <span>Filtrează</span>
                    </button>
                </div>
                
                {/* Opțiuni de filtrare */}
                {filterOpen && (
                    <div className="bg-white p-4 rounded-xl shadow-md mb-8 animate-fadeIn">
                        <h3 className="font-medium text-gray-700 mb-3">Filtrează după profil:</h3>
                        <div className="flex flex-wrap gap-2">
                            {filtreProfil.map(profil => (
                                <button 
                                    key={profil}
                                    className="px-4 py-2 bg-[#f0f2ff] hover:bg-[#e5e8ff] text-[#4747A9] rounded-full text-sm"
                                >
                                    {profil}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Indicator de încărcare */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#e0e4ff] rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#5F5FDF] rounded-full border-t-transparent animate-spin"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {subiecte?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {subiecte.map((subiect) => (
                                    <div 
                                        key={subiect._id} 
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                                        onClick={() => navigate(`/subiecte/${materie}/${subiect._id}`)}
                                    >
                                        {/* Banda colorată superioară */}
                                        <div className="h-2 bg-gradient-to-r from-[#5F5FDF] to-[#7676FF]"></div>
                                        
                                        <div className="p-6">
                                            {/* Titlu și categorii */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#5F5FDF] transition-colors line-clamp-2">
                                                    {subiect.titlu}
                                                </h3>
                                                
                                                {/* Badges/categorii */}
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {subiect.categorii && (
                                                        <>
                                                            {typeof subiect.categorii === 'string' ? (
                                                                // Încercăm să parsăm string-ul JSON
                                                                (() => {
                                                                    try {
                                                                        const categoriiArray = JSON.parse(subiect.categorii);
                                                                        return categoriiArray.map((categorie, idx) => (
                                                                            <span key={idx} className="bg-[#f0f2ff] text-[#5F5FDF] px-3 py-1 rounded-full text-xs font-medium">
                                                                                {categorie}
                                                                            </span>
                                                                        ));
                                                                    } catch (e) {
                                                                        return (
                                                                            <span className="bg-[#f0f2ff] text-[#5F5FDF] px-3 py-1 rounded-full text-xs font-medium">
                                                                                {subiect.categorii}
                                                                            </span>
                                                                        );
                                                                    }
                                                                })()
                                                            ) : Array.isArray(subiect.categorii) ? (
                                                                subiect.categorii.map((categorie, idx) => (
                                                                    <span key={idx} className="bg-[#f0f2ff] text-[#5F5FDF] px-3 py-1 rounded-full text-xs font-medium">
                                                                        {categorie}
                                                                    </span>
                                                                ))
                                                            ) : null
                                                        }
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Descriere */}
                                            <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                                                {subiect.descriere}
                                            </p>
                                            
                                            {/* Metadate și acțiuni */}
                                            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <FaUser className="mr-2 text-[#5F5FDF]" size={14} />
                                                    <span className="capitalize">{subiect.username}</span>
                                                </div>
                                                
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <FaCalendarAlt className="mr-2 text-[#5F5FDF]" size={14} />
                                                    <span>{new Date(subiect.createdAt).toLocaleDateString('ro-RO')}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Buton de acțiune */}
                                            <div className="flex justify-end mt-4">
                                                <button className="flex items-center gap-2 text-[#5F5FDF] text-sm font-medium group-hover:translate-x-1 transition-transform">
                                                    <span>Vezi detalii</span>
                                                    <FaChevronRight size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                                <div className="flex flex-col items-center max-w-lg mx-auto py-12">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 bg-[#f0f2ff] rounded-full flex items-center justify-center">
                                            <FaBook className="text-[#5F5FDF]" size={36} />
                                        </div>
                                        <div className="absolute -top-3 -right-3 bg-red-100 rounded-full p-3 border-4 border-white">
                                            <FaTimes className="text-red-500" size={20} />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                        Niciun subiect disponibil momentan
                                    </h3>
                                    
                                    <p className="text-gray-600 mb-8">
                                        Pare că încă nu există subiecte postate pentru {formatMaterieName(materie)}. 
                                        Fii primul care contribuie cu un subiect valoros pentru colegi!
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button 
                                            onClick={() => navigate('/posteaza-subiect')}
                                            className="bg-gradient-to-r from-[#5F5FDF] to-[#7676FF] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-200/50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <FaBook size={16} />
                                            <span>Postează un subiect</span>
                                        </button>
                                        
                                        <button 
                                            onClick={() => navigate('/home')}
                                            className="bg-white text-gray-800 border border-gray-200 px-6 py-3 rounded-lg hover:border-gray-300 transition-all"
                                        >
                                            Înapoi acasă
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Subiecte;