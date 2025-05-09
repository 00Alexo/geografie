import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const WorldMap = () => {
    const globeRef = useRef();
    const [megalopolises, setMegalopolises] = useState([]);
    const [selectedMegalopolis, setSelectedMegalopolis] = useState(null);

    useEffect(() => {
        // Data for world's major megalopolises
        const megalopolisesData = [
            { name: "BosWash", label: "Boston-Washington Corridor", lat: 40.7128, lng: -74.0060, population: "50+ million", color: "rgba(255, 0, 0, 0.8)", countries: "USA" },
            { name: "Blue Banana", label: "London-Milan Corridor", lat: 49.4544, lng: 6.7807, population: "110+ million", color: "rgba(0, 0, 255, 0.8)", countries: "UK, France, Belgium, Netherlands, Germany, Switzerland, Italy" },
            { name: "Taiheiyo Belt", label: "Japanese Megalopolis", lat: 35.6762, lng: 139.6503, population: "80+ million", color: "rgba(0, 255, 0, 0.8)", countries: "Japan" },
            { name: "Beijing-Tianjin-Hebei", label: "Jing-Jin-Ji", lat: 39.9042, lng: 116.4074, population: "130+ million", color: "rgba(255, 255, 0, 0.8)", countries: "China" },
            { name: "Yangtze River Delta", label: "Shanghai Megalopolis", lat: 31.2304, lng: 121.4737, population: "80+ million", color: "rgba(255, 0, 255, 0.8)", countries: "China" },
            { name: "Pearl River Delta", label: "Hong Kong-Shenzhen-Guangzhou", lat: 22.3193, lng: 114.1694, population: "70+ million", color: "rgba(0, 255, 255, 0.8)", countries: "China, Hong Kong" },
            { name: "Delhi-Lahore", label: "Indo-Pakistani Corridor", lat: 28.7041, lng: 77.1025, population: "80+ million", color: "rgba(128, 0, 128, 0.8)", countries: "India, Pakistan" },
            { name: "Rio-Sao Paulo", label: "Brazilian Megalopolis", lat: -22.9068, lng: -43.1729, population: "45+ million", color: "rgba(255, 165, 0, 0.8)", countries: "Brazil" },
        ];

        setMegalopolises(megalopolisesData);

        // Auto-rotate and set initial position
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.5;
            
            // Set initial position to view Europe
            globeRef.current.pointOfView({ lat: 30, lng: 10, altitude: 2.5 });
        }
    }, []);

    // Label configuration
    const labelData = megalopolises.map(m => ({
        ...m,
        size: 1.5,
        text: m.label,
    }));

    // Ring configuration for megalopolises
    const ringsData = megalopolises.map(m => ({
        ...m,
        maxR: 3,
        propagationSpeed: 2,
        repeatPeriod: 1000,
    }));

    return (
        <div className="h-[calc(100vh-80px)] w-full bg-gray-900 relative overflow-hidden">
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                
                labelsData={labelData}
                labelLat={d => d.lat}
                labelLng={d => d.lng}
                labelText={d => d.label}
                labelSize={d => d.size}
                labelDotRadius={0.4}
                labelColor={() => 'white'}
                labelResolution={2}
                
                ringsData={ringsData}
                ringLat={d => d.lat}
                ringLng={d => d.lng}
                ringColor={d => d.color}
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"

                onLabelClick={(label) => {
                    setSelectedMegalopolis(label);
                    if (globeRef.current) {
                        globeRef.current.pointOfView({ lat: label.lat, lng: label.lng, altitude: 1.5 }, 1000);
                        globeRef.current.controls().autoRotate = false;
                    }
                }}
            />
            
            {selectedMegalopolis && (
                <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg max-w-md">
                    <h2 className="text-xl font-bold mb-2">{selectedMegalopolis.label}</h2>
                    <p className="mb-1"><span className="font-semibold">Area:</span> {selectedMegalopolis.name}</p>
                    <p className="mb-1"><span className="font-semibold">Population:</span> {selectedMegalopolis.population}</p>
                    <p className="mb-1"><span className="font-semibold">Countries:</span> {selectedMegalopolis.countries}</p>
                    <button 
                        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => {
                            setSelectedMegalopolis(null);
                            if (globeRef.current) {
                                globeRef.current.controls().autoRotate = true;
                                globeRef.current.pointOfView({ lat: 30, lng: 10, altitude: 2.5 }, 1000);
                            }
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
            
            <div className="absolute bottom-4 left-4 text-white/80 text-sm">
                <p>Click on a megalopolis label to learn more</p>
            </div>
        </div>
    );
}
 
export default WorldMap;