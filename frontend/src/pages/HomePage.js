import { useState } from 'react';
import WelcomePage from './WelcomePage';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaTrophy, FaBook, FaChartBar, FaMapMarked, FaExchangeAlt } from 'react-icons/fa';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Înregistrează componentele Chart.js necesare
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const HomePage = () => {
    const { user, isAuthReady } = useAuthContext();
    const [activeTab, setActiveTab] = useState('bacSubiecte'); // 'bacSubiecte' sau 'settera'
    
    // Dacă starea de autentificare nu este încă gata, afișăm un loader
    if (!isAuthReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f7ff]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#5F5FDF]"></div>
            </div>
        );
    }
    
    // Pentru utilizatori neautentificați afișăm WelcomePage
    if (!user) {
        return <WelcomePage />;
    }
    
    // Date mock pentru clasament Subiecte BAC
    const bacLeaderboard = [
        { id: 1, name: "Ana Maria", school: "Colegiul Național Sf. Sava", score: 950, solved: 38 },
        { id: 2, name: "Mihai Popescu", school: "Liceul Teoretic Grigore Moisil", score: 920, solved: 36 },
        { id: 3, name: "Elena Ionescu", school: "Colegiul Național Emil Racoviță", score: 880, solved: 35 },
        { id: 4, name: "Alexandru Popa", school: "Colegiul Național Mihai Eminescu", score: 845, solved: 34 },
        { id: 5, name: "Andreea Constantinescu", school: "Colegiul Național Gheorghe Lazăr", score: 830, solved: 33 },
        { id: 6, name: "Bogdan Munteanu", school: "Colegiul Național Mihai Viteazul", score: 810, solved: 32 },
        { id: 7, name: "Cristina Dumitru", school: "Liceul Teoretic Nicolae Iorga", score: 790, solved: 31 },
        { id: 8, name: "Daniel Stancu", school: "Colegiul Național Ion Creangă", score: 775, solved: 30 },
        { id: 9, name: "Maria Păun", school: "Liceul Teoretic Constantin Noica", score: 760, solved: 29 },
        { id: 10, name: "Vlad Georgescu", school: "Colegiul Național Cantemir Vodă", score: 750, solved: 28 },
    ];
    
    // Date mock pentru clasament Settera (jocul cu hărți)
    const setteraLeaderboard = [
        { id: 1, name: "Tudor Andrei", school: "Colegiul Național Ion Luca Caragiale", score: 12500, maps: 45 },
        { id: 2, name: "Sofia Diaconu", school: "Colegiul Național Spiru Haret", score: 11800, maps: 42 },
        { id: 3, name: "Radu Marinescu", school: "Liceul Teoretic Jean Monnet", score: 11200, maps: 40 },
        { id: 4, name: "Ioana Vasilescu", school: "Colegiul Național Iulia Hasdeu", score: 10800, maps: 38 },
        { id: 5, name: "Gabriel Stoica", school: "Liceul Teoretic Tudor Vianu", score: 10500, maps: 37 },
        { id: 6, name: "Bianca Nicolescu", school: "Colegiul Național Gheorghe Șincai", score: 10200, maps: 36 },
        { id: 7, name: "Matei Ionescu", school: "Colegiul Național Aurel Vlaicu", score: 9800, maps: 35 },
        { id: 8, name: "Diana Preda", school: "Liceul Teoretic Eugen Lovinescu", score: 9500, maps: 34 },
        { id: 9, name: "Victor Dumitrescu", school: "Colegiul Național Dimitrie Cantemir", score: 9200, maps: 33 },
        { id: 10, name: "Iulia Radu", school: "Liceul Teoretic Lucian Blaga", score: 9000, maps: 32 },
    ];
    
    // Date pentru grafice
    const subiecteData = {
        labels: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai'],
        datasets: [
            {
                label: 'Subiecte Rezolvate',
                data: [5, 8, 12, 7, 15],
                backgroundColor: 'rgba(95, 95, 223, 0.6)',
                borderColor: '#5F5FDF',
                borderWidth: 2,
                fill: true,
            }
        ]
    };
    
    const progressData = {
        labels: ['Europa', 'Asia', 'Africa', 'America de Nord', 'America de Sud', 'Australia'],
        datasets: [
            {
                data: [85, 60, 45, 75, 50, 30],
                backgroundColor: [
                    '#5F5FDF', '#6A7FE3', '#7596E8', '#80ABED', '#8BC0F2', '#95D6F7'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
            }
        ]
    };
    
    const subiecteTipData = {
        labels: ['Hărți', 'Climatologie', 'Hidrologie', 'Relief', 'Populație', 'Economie'],
        datasets: [
            {
                label: 'Progres pe categorii',
                data: [85, 65, 70, 90, 60, 75],
                backgroundColor: 'rgba(71, 71, 169, 0.6)',
                borderColor: '#4747A9',
                borderWidth: 2,
            }
        ]
    };
    
    return (
        <div className="min-h-screen bg-[#f5f7ff] pb-16">
            {/* Header/Banner pentru dashboard */}
            <div className="bg-gradient-to-r from-[#5F5FDF] to-[#4747A9] py-12 px-6 text-white">
                <div className="max-w-[90%] mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Bine ai revenit, {user.username}!</h1>
                    <p className="text-[#EDE8F5] opacity-90 text-lg">Continuă să exersezi și să-ți îmbunătățești cunoștințele de geografie.</p>
                </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="lg:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Tabs pentru Switch între Clasamente */}
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#5F5FDF]">Clasamente și Statistici</h2>
                    
                    <div className="bg-white shadow-md rounded-xl p-1 flex">
                        <button 
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${activeTab === 'bacSubiecte' ? 'bg-[#5F5FDF] text-white' : 'text-[#5F5FDF]'}`}
                            onClick={() => setActiveTab('bacSubiecte')}
                        >
                            <FaBook /> Subiecte BAC
                        </button>
                        <button 
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${activeTab === 'settera' ? 'bg-[#5F5FDF] text-white' : 'text-[#5F5FDF]'}`}
                            onClick={() => setActiveTab('settera')}
                        >
                            <FaMapMarked /> Settera
                        </button>
                    </div>
                </div>
                
                {/* Conținut în funcție de tab-ul activ */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Prima coloană - Clasament */}
                    <div className="lg:col-span-1 bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="p-6 bg-[#5F5FDF] text-white">
                            <div className="flex items-center gap-3 mb-1">
                                <FaTrophy className="text-2xl" />
                                <h3 className="text-xl font-bold">
                                    Top 10 {activeTab === 'bacSubiecte' ? 'Subiecte BAC' : 'Settera'}
                                </h3>
                            </div>
                            <p className="text-sm opacity-80">
                                {activeTab === 'bacSubiecte' 
                                    ? 'Clasament bazat pe numărul de subiecte rezolvate și scorul obținut.' 
                                    : 'Clasament bazat pe hărțile explorate și punctele acumulate.'}
                            </p>
                        </div>
                        
                        {/* Versiunea pentru desktop */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#f9f9ff]">
                                        <th className="py-4 px-6 font-semibold">Loc</th>
                                        <th className="py-4 px-6 font-semibold">Elev</th>
                                        <th className="py-4 px-6 font-semibold">Școală</th>
                                        <th className="py-4 px-6 font-semibold text-right">
                                            {activeTab === 'bacSubiecte' ? 'Subiecte' : 'Hărți'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(activeTab === 'bacSubiecte' ? bacLeaderboard : setteraLeaderboard).map((entry, index) => (
                                        <tr key={entry.id} className={`border-t border-[#f0f0f8] ${index < 3 ? 'bg-[#f5f7ff]' : ''}`}>
                                            <td className="py-4 px-6">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                    index === 0 ? 'bg-yellow-400' :
                                                    index === 1 ? 'bg-gray-300' :
                                                    index === 2 ? 'bg-amber-700' : 'bg-gray-100'
                                                } text-white font-medium`}>
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-medium">{entry.name}</td>
                                            <td className="py-4 px-6 text-gray-600 text-sm">{entry.school}</td>
                                            <td className="py-4 px-6 text-right font-bold text-[#5F5FDF]">
                                                {activeTab === 'bacSubiecte' ? entry.solved : entry.maps}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Versiunea pentru mobil - card-uri în loc de tabel */}
                        <div className="md:hidden">
                            {(activeTab === 'bacSubiecte' ? bacLeaderboard : setteraLeaderboard).map((entry, index) => (
                                <div key={entry.id} className={`p-4 border-b border-[#f0f0f8] ${index < 3 ? 'bg-[#f5f7ff]' : ''}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                index === 0 ? 'bg-yellow-400' :
                                                index === 1 ? 'bg-gray-300' :
                                                index === 2 ? 'bg-amber-700' : 'bg-gray-100'
                                            } text-white font-medium`}>
                                                {index + 1}
                                            </div>
                                            <span className="font-medium">{entry.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="px-3 py-1 bg-[#f0f0f8] rounded-full font-bold text-[#5F5FDF]">
                                                {activeTab === 'bacSubiecte' ? entry.solved : entry.maps}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-600 text-sm pl-9">{entry.school}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* A doua și a treia coloană - Statistici și Grafice */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Grafic progres lunar */}
                        <div className="bg-white shadow-lg rounded-xl p-6">
                            <h3 className="text-xl font-bold text-[#4747A9] mb-4">Progres Lunar</h3>
                            <div className="h-64">
                                {activeTab === 'bacSubiecte' ? (
                                    <Line 
                                        data={subiecteData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                ) : (
                                    <Bar 
                                        data={subiecteData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        
                        {/* Grafic progres pe categorii/regiuni */}
                        <div className="bg-white shadow-lg rounded-xl p-6">
                            <h3 className="text-xl font-bold text-[#4747A9] mb-4">
                                {activeTab === 'bacSubiecte' ? 'Progres pe Categorii' : 'Regiuni Explorate'}
                            </h3>
                            <div className="h-64 flex items-center justify-center">
                                {activeTab === 'bacSubiecte' ? (
                                    <Bar 
                                        data={subiecteTipData}
                                        options={{
                                            responsive: true,
                                            indexAxis: 'y',
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                ) : (
                                    <Doughnut 
                                        data={progressData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'right'
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        
                        {/* Statistici recente */}
                        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-6">
                            <h3 className="text-xl font-bold text-[#4747A9] mb-6">Statistici Recente</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-[#f5f7ff] rounded-xl p-4 border border-[#e0e6ff]">
                                    <div className="text-sm text-gray-600 mb-1">Total Subiecte Rezolvate</div>
                                    <div className="text-2xl font-bold text-[#5F5FDF]">47</div>
                                </div>
                                
                                <div className="bg-[#f5f7ff] rounded-xl p-4 border border-[#e0e6ff]">
                                    <div className="text-sm text-gray-600 mb-1">Scor Mediu</div>
                                    <div className="text-2xl font-bold text-[#5F5FDF]">8.7</div>
                                </div>
                                
                                <div className="bg-[#f5f7ff] rounded-xl p-4 border border-[#e0e6ff]">
                                    <div className="text-sm text-gray-600 mb-1">Rezolvate Săptămâna Aceasta</div>
                                    <div className="text-2xl font-bold text-[#5F5FDF]">15</div>
                                </div>
                                
                                <div className="bg-[#f5f7ff] rounded-xl p-4 border border-[#e0e6ff]">
                                    <div className="text-sm text-gray-600 mb-1">Poziție în Clasament</div>
                                    <div className="text-2xl font-bold text-[#5F5FDF]">12</div>
                                </div>
                            </div>
                            
                            {activeTab === 'bacSubiecte' && (
                                <div className="mt-8">
                                    <h4 className="font-semibold text-[#4747A9] mb-3">Subiecte Recente Rezolvate</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: "Geografia României - Sub. I, BAC 2024", score: 9.5, date: "2024-05-10" },
                                            { title: "Geografia Europei - Sub. II, BAC 2023", score: 8.2, date: "2024-05-09" },
                                            { title: "Geografia Mediului - Sub. III, BAC 2024", score: 9.0, date: "2024-05-07" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f0f0f8]">
                                                <div>
                                                    <div className="font-medium">{item.title}</div>
                                                    <div className="text-sm text-gray-500">{item.date}</div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full font-medium ${
                                                    item.score >= 9 ? 'bg-green-100 text-green-800' : 
                                                    item.score >= 7 ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-orange-100 text-orange-800'
                                                }`}>
                                                    {item.score}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'settera' && (
                                <div className="mt-8">
                                    <h4 className="font-semibold text-[#4747A9] mb-3">Hărți Recent Explorate</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: "Capitalele Europei", score: 95, total: 100, date: "2024-05-10" },
                                            { title: "Munții României", score: 82, total: 100, date: "2024-05-08" },
                                            { title: "Marile orașe ale lumii", score: 90, total: 100, date: "2024-05-06" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f0f0f8]">
                                                <div>
                                                    <div className="font-medium">{item.title}</div>
                                                    <div className="text-sm text-gray-500">{item.date}</div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full font-medium ${
                                                    item.score >= 90 ? 'bg-green-100 text-green-800' : 
                                                    item.score >= 70 ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-orange-100 text-orange-800'
                                                }`}>
                                                    {item.score}/{item.total}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;