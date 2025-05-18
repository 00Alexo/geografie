import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { FaCity, FaUserAlt, FaGlobeAmericas, FaUsers, FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import * as THREE from 'three';

const WorldMap = () => {
    const globeRef = useRef();
    const [megalopolises, setMegalopolises] = useState([]);
    const [selectedMegalopolis, setSelectedMegalopolis] = useState(null);

    useEffect(() => {
        // Improved data for world's major megalopolises with adjusted coordinates to prevent overlapping
        const megalopolisesData = [
            { 
                id: 1,
                name: "BosWash", 
                label: "New York - Washington", 
                lat: 40.7128, 
                lng: -74.0060, 
                population: "Peste 50 de milioane", 
                color: "#FF5555", 
                countries: "SUA",
                description: "Coridorul Boston–Washington, cunoscut și ca megalopolisul nord-estic, leagă orașe importante precum Boston, New York, Philadelphia, Baltimore și Washington D.C."
            },
            { 
                id: 2,
                name: "Tokaido", 
                label: "Tokyo - Osaka - Kobe", 
                lat: 35.6762, 
                lng: 139.6503, 
                population: "Peste 80 de milioane", 
                color: "#5555FF", 
                countries: "Japonia",
                description: "Cel mai mare și mai important megalopolis economic din Japonia, care se întinde de la Tokyo la Osaka de-a lungul coastei Pacificului."
            },
            { 
                id: 3,
                name: "Brazilian", 
                label: "São Paulo - Rio de Janeiro", 
                lat: -23.5505, 
                lng: -46.6333, 
                population: "Peste 45 de milioane", 
                color: "#55FF55", 
                countries: "Brazilia",
                description: "Un centru industrial și economic major care conectează cele mai mari orașe din Brazilia."
            },
            { 
                id: 4,
                name: "Midlands", 
                label: "Londra - Manchester - Birmingham", 
                lat: 52.4862, 
                lng: -1.8904, 
                population: "Peste 15 milioane", 
                color: "#FFA500", 
                countries: "Regatul Unit",
                description: "O regiune urbană interconectată în centrul Angliei, care leagă mai multe orașe industriale importante."
            },
            { 
                id: 5,
                name: "Randstad", 
                label: "Amsterdam - Rotterdam", 
                lat: 52.3676, 
                lng: 4.9041, 
                population: "Peste 8 milioane", 
                color: "#FF55FF", 
                countries: "Țările de Jos",
                description: "O zonă urbană policentrică în vestul Țărilor de Jos, incluzând Amsterdam, Rotterdam, Haga și Utrecht."
            },
            { 
                id: 6,
                name: "Ruhr-Rhine", 
                label: "Dortmund - Köln", 
                lat: 51.4818, 
                lng: 7.2162, 
                population: "Peste 10 milioane", 
                color: "#55FFFF", 
                countries: "Germania",
                description: "Una dintre cele mai mari zone urbane din Europa, centrată în regiunea Rin-Ruhr din Germania."
            },
            { 
                id: 7,
                name: "Australian", 
                label: "Sydney - Melbourne", 
                lat: -33.8688, 
                lng: 151.2093, 
                population: "Peste 10 milioane", 
                color: "#800080", 
                countries: "Australia",
                description: "Megalopolisul de pe coasta de est care leagă cele mai mari două orașe ale Australiei."
            },
            { 
                id: 8,
                name: "Californian", 
                label: "Los Angeles - San Francisco", 
                lat: 34.0522, 
                lng: -118.2437, 
                population: "Peste 40 de milioane", 
                color: "#808000", 
                countries: "SUA",
                description: "Regiune urbanizată majoră de-a lungul coastei Californiei."
            },
            { 
                id: 9,
                name: "Great Lakes", 
                label: "Chicago - Detroit", 
                lat: 41.8781, 
                lng: -87.6298, 
                population: "Peste 55 de milioane", 
                color: "#0064C8", 
                countries: "SUA",
                description: "Regiune urbană din jurul Marilor Lacuri, care cuprinde centre industriale importante."
            },
            { 
                id: 10,
                name: "Pearl River Delta", 
                label: "Hong Kong - Guangzhou - Shenzhen", 
                lat: 22.5431, 
                lng: 114.0579, 
                population: "Peste 70 de milioane", 
                color: "#CD5C5C", 
                countries: "China",
                description: "Una dintre cele mai mari zone urbane din lume, un centru important de producție și tehnologie."
            },
            { 
                id: 11,
                name: "Yangtze River Delta", 
                label: "Shanghai - Nanjing", 
                lat: 31.2304, 
                lng: 121.4737, 
                population: "Peste 100 de milioane", 
                color: "#8B4513", 
                countries: "China",
                description: "Cel mai mare megalopolis din China, centrat în jurul Shanghaiului și al Deltei Fluviului Yangtze."
            },
            { 
                id: 12,
                name: "Delhi-NCR", 
                label: "Delhi - Gurgaon - Noida", 
                lat: 28.6139, 
                lng: 77.2090, 
                population: "Peste 30 de milioane", 
                color: "#FF7F50", 
                countries: "India",
                description: "O aglomerație urbană majoră centrată în jurul orașului Delhi și a Regiunii Capitalei Naționale din India."
            }
        ];

        setMegalopolises(megalopolisesData);

        // Auto-rotate and set initial position
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.5;
            
            // Set initial position to see more of the world
            globeRef.current.pointOfView({ lat: 25, lng: 10, altitude: 2.8 });
        }
    }, []);

    // Use HTML elements for custom city icons instead of labels and rings
    const htmlElementsData = megalopolises.map(m => ({
        ...m,
        size: 16
    }));

    const handleCityClick = (city) => {
        setSelectedMegalopolis(city);
        if (globeRef.current) {
            globeRef.current.pointOfView({ lat: city.lat, lng: city.lng, altitude: 1.5 }, 1000);
            globeRef.current.controls().autoRotate = false;
        }
    };

    const resetView = () => {
        setSelectedMegalopolis(null);
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.pointOfView({ lat: 25, lng: 10, altitude: 2.8 }, 1000);
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] w-full bg-gray-900 relative overflow-hidden">
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                
                // Use points directly on the globe's surface instead of HTML elements
                pointsData={htmlElementsData}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={0} // Set to 0 to ensure points are on the globe surface
                pointRadius={0.5} // Small point size
                pointColor="color"
                onPointClick={handleCityClick}
                
                
                // Custom render for points to use city icons
                customLayerData={htmlElementsData}
                customThreeObject={d => {
                    // Create a canvas for our icon
                    const canvas = document.createElement('canvas');
                    canvas.width = 64;
                    canvas.height = 64;
                    const ctx = canvas.getContext('2d');
                    
                    // Draw house icon
                    ctx.fillStyle = d.color;
                    ctx.beginPath();
                    // Simple house shape
                    ctx.moveTo(32, 10);  // top point
                    ctx.lineTo(10, 30);  // left bottom of roof
                    ctx.lineTo(54, 30);  // right bottom of roof
                    ctx.closePath();
                    ctx.fill();
                    
                    // House body
                    ctx.fillRect(15, 30, 34, 24);
                    
                    // Create sprite
                    const texture = new THREE.CanvasTexture(canvas);
                    const material = new THREE.SpriteMaterial({ 
                        map: texture,
                        transparent: true,
                        alphaTest: 0.5
                    });
                    
                    const sprite = new THREE.Sprite(material);
                    sprite.scale.set(0.5, 0.5, 1);
                    
                    return sprite;
                }}
                htmlElementsData={htmlElementsData}
                htmlLat={d => d.lat}
                htmlLng={d => d.lng}
                htmlAltitude={0.1}
                htmlElement={d => {
                    const el = document.createElement('div');
                    el.innerHTML = `
                        <div class="city-marker" style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            color: ${d.color};
                            cursor: pointer;
                            transform: translate(-50%, -50%);
                        ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="${d.size}px" height="${d.size}px" fill="${d.color}">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                            </svg>
                            <span style="
                                font-size: 10px;
                                background-color: rgba(0,0,0,0.7);
                                padding: 2px 4px;
                                border-radius: 3px;
                                margin-top: 2px;
                                white-space: nowrap;
                            ">${d.name}</span>
                        </div>
                    `;
                    el.style.pointerEvents = 'auto';
                    el.addEventListener('click', () => handleCityClick(d));
                    return el;
                }}
                customThreeObjectUpdate={(obj, d) => {
                    Object.assign(obj.position, globeRef.current.getCoords(d.lat, d.lng, 0));
                }}
            />
            
            {selectedMegalopolis && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4 transition-all duration-300">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all animate-fadeIn">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-[#5F5FDF] to-[#4747A9] p-5 relative">
                            <button 
                                onClick={resetView}
                                className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-1">{selectedMegalopolis.label}</h2>
                            <p className="text-white/80 text-sm">{selectedMegalopolis.name} Megalopolis</p>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#f0f2ff] rounded-lg p-4 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-[#5F5FDF]/20 flex items-center justify-center mb-2">
                                        <FaUsers className="text-[#5F5FDF]" size={18} />
                                    </div>
                                    <p className="text-gray-600 text-sm mb-1">Population</p>
                                    <p className="font-bold text-[#4747A9]">{selectedMegalopolis.population}</p>
                                </div>
                                
                                <div className="bg-[#f0f2ff] rounded-lg p-4 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-[#5F5FDF]/20 flex items-center justify-center mb-2">
                                        <FaGlobeAmericas className="text-[#5F5FDF]" size={18} />
                                    </div>
                                    <p className="text-gray-600 text-sm mb-1">Countries</p>
                                    <p className="font-bold text-[#4747A9]">{selectedMegalopolis.countries}</p>
                                </div>
                            </div>
                            
                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">About this Region</h3>
                                <p className="text-gray-600">{selectedMegalopolis.description}</p>
                            </div>
                            
                            {/* Location Info */}
                            <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#e0e6ff] mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[#5F5FDF]/20 flex items-center justify-center">
                                        <FaMapMarkedAlt className="text-[#5F5FDF]" size={16} />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Location Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <p className="text-gray-500">Latitude</p>
                                        <p className="font-medium">{selectedMegalopolis.lat.toFixed(4)}°</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Longitude</p>
                                        <p className="font-medium">{selectedMegalopolis.lng.toFixed(4)}°</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Button */}
                            <button 
                                onClick={resetView}
                                className="w-full py-3 px-4 bg-gradient-to-r from-[#5F5FDF] to-[#7676FF] text-white rounded-lg shadow-lg hover:shadow-[#5F5FDF]/30 transition-all hover:translate-y-[-2px] font-medium flex items-center justify-center gap-2"
                            >
                                <FaCity size={16} />
                                <span>Inchide si continua sa explorezi</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            
            <div className="absolute bottom-4 left-4 bg-black/50 p-3 rounded-lg backdrop-blur-sm">
                <p className="text-white/90 text-sm">Apasa pe o iconita pentru a primi mai multe informatii despre megalopolis</p>
            </div>
        </div>
    );
}
 
export default WorldMap;