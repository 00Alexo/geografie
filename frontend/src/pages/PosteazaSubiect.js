import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaCamera, FaSpinner, FaCheck } from 'react-icons/fa';
import NotFound from "./NotFound";

// Date pentru selecturi
const subiecte = [
    { key: "geografie", label: "Geografie" },
];

const profile = [
    { key: "filologie", label: "Filologie" },
    { key: "stiinte_sociale", label: "Științe Sociale" },
];

const categoriiContinut = [
    { key: "harti", label: "Hărți" },
    { key: "climatologie", label: "Climatologie" },
    { key: "hidrologie", label: "Hidrologie" },
    { key: "relief", label: "Relief" },
    { key: "populatie", label: "Populație" },
    { key: "economie", label: "Economie" },
    { key: "agricultura", label: "Agricultură" },
    { key: "transporturi", label: "Transporturi" },
    { key: "turism", label: "Turism" },
    { key: "urbanism", label: "Urbanism" },
    { key: "resurse_naturale", label: "Resurse Naturale" },
    { key: "protectia_mediului", label: "Protecția Mediului" },
    { key: "geopolitica", label: "Geopolitică" },
    { key: "geografia_romaniei", label: "Geografia Romaniei" },
];

const PosteazaSubiect = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [profil, setProfil] = useState("");
    const [materie, setMaterie] = useState("");
    const [descriere, setDescriere] = useState("");
    const [titlu, setTitlu] = useState("");
    const [subiect, setSubiect] = useState(null);
    const [barem, setBarem] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorFields, setErrorFields] = useState([]);
    const [categoriiSelectate, setCategoriiSelectate] = useState([]);

    // Funcție pentru afișarea temporară a erorilor
    const showError = (message) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 7000);
    };

    // Funcție pentru a adăuga/elimina categorii selectate
    const toggleCategorie = (categorie) => {
        setCategoriiSelectate(prev => {
            if (prev.includes(categorie)) {
                return prev.filter(cat => cat !== categorie);
            } else {
                return [...prev, categorie];
            }
        });
    };

    const nextStep = async () => {
        setLoading(true);
        
        // Validare locală a formularului
        const newErrorFields = [];
        if (!profil) newErrorFields.push("profil");
        if (!materie) newErrorFields.push("materie");
        if (!titlu) newErrorFields.push("titlu");
        if (!subiect) newErrorFields.push("subiect");
        if (!barem) newErrorFields.push("barem");
        if (!descriere) newErrorFields.push("descriere");
        if (categoriiSelectate.length === 0) newErrorFields.push("categorii");
        
        if (newErrorFields.length > 0) {
            setErrorFields(newErrorFields);
            showError("Te rugăm să completezi toate câmpurile obligatorii.");
            setLoading(false);
            return;
        }
        
        // Formular pentru trimiterea datelor
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("profil", profil);
        formData.append("materie", materie);
        formData.append("descriere", descriere);
        formData.append("titlu", titlu);
        formData.append("subiect", subiect);
        formData.append("barem", barem);
        formData.append("categorii", JSON.stringify(categoriiSelectate));

        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/subiecte/uploadSubiect`, {
                method: 'POST',
                body: formData,
            });

            const json = await response.json();

            if (response.ok) {
                console.log("Fișierele au fost încărcate cu succes!", json);
                navigate('/home', { state: { fromPostareSubiect: true } });
            } else {
                console.log(json);
                setError(json.error || "A apărut o eroare la încărcarea fișierelor");
                setErrorFields(json.errorFields || []);
            }
        } catch (err) {
            setError("Eroare de conexiune. Verifică conexiunea la internet și încearcă din nou.");
        }
        
        setLoading(false);
    };

    if (!user) {
        return <NotFound />;
    }

    return (
        <div className="bg-[#f5f7ff] min-h-[calc(100vh-80px)] py-8">
            {/* Alertă eroare */}
            {error && (
                <div className="w-2/3 mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative">
                    <strong className="font-bold">Eroare! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="w-[90%] md:w-2/3 mt-4 rounded-lg mx-auto border border-zinc-300 p-4 md:p-6 flex flex-col gap-6 bg-white shadow-md">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-3xl text-gray-950 font-bold">Postează un subiect</h1>
                    <p className="text-gray-600">Completează formularul pentru a posta un subiect nou.</p>
                </div>
                
                {/* Profil și materie */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label className="font-semibold text-gray-800">Profil</label>
                        <div className={`relative ${errorFields.includes("profil") ? "ring-2 ring-red-500 rounded-lg" : ""}`}>
                            <select
                                value={profil}
                                onChange={(e) => setProfil(e.target.value)}
                                className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#5F5FDF] focus:border-[#5F5FDF] appearance-none"
                            >
                                <option value="" disabled>Selectează profilul</option>
                                {profile.map((item) => (
                                    <option key={item.key} value={item.key}>{item.label}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label className="font-semibold text-gray-800">Materie</label>
                        <div className={`relative ${errorFields.includes("materie") ? "ring-2 ring-red-500 rounded-lg" : ""}`}>
                            <select
                                value={materie}
                                onChange={(e) => setMaterie(e.target.value)}
                                className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#5F5FDF] focus:border-[#5F5FDF] appearance-none"
                            >
                                <option value="" disabled>Selectează materia</option>
                                {subiecte.map((item) => (
                                    <option key={item.key} value={item.key}>{item.label}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categorii conținut (MultiSelect) */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-semibold text-gray-800">Categorii conținut</label>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {categoriiContinut.map((categorie) => (
                                <button
                                    key={categorie.key}
                                    type="button"
                                    onClick={() => toggleCategorie(categorie.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                        categoriiSelectate.includes(categorie.key)
                                            ? "bg-[#5F5FDF] text-white border-[#5F5FDF]"
                                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                                    }`}
                                >
                                    {categoriiSelectate.includes(categorie.key) && <FaCheck size={12} />}
                                    {categorie.label}
                                </button>
                            ))}
                        </div>
                        {errorFields.includes("categorii") && (
                            <p className="text-red-500 text-sm mt-1">Selectează cel puțin o categorie</p>
                        )}
                    </div>
                </div>

                {/* Titlu */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-semibold text-gray-800">Titlu</label>
                    <div className={`${errorFields.includes("titlu") ? "ring-2 ring-red-500 rounded-lg" : ""}`}>
                        <input
                            type="text"
                            value={titlu}
                            onChange={(e) => setTitlu(e.target.value)}
                            placeholder="Accentul principal al subiectului..."
                            className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#5F5FDF] focus:border-[#5F5FDF]"
                        />
                    </div>
                </div>

                {/* Descriere */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-semibold text-gray-800">Descriere</label>
                    <textarea
                        value={descriere}
                        onChange={(e) => setDescriere(e.target.value)}
                        placeholder="O scurtă descriere a subiectului..."
                        rows="3"
                        className={`w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#5F5FDF] focus:border-[#5F5FDF] resize-y
                        ${errorFields.includes("descriere") ? "ring-2 ring-red-500" : ""}`}
                    ></textarea>
                </div>

                {/* Fișiere și buton trimitere */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Input subiect */}
                        <div>
                            <input
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const validTypes = ["application/pdf"];
                                        if (validTypes.includes(file.type)) {
                                            setSubiect(file);
                                        } else {
                                            showError("Doar fișiere PDF sunt permise!");
                                            e.target.value = "";
                                        }
                                    }
                                }}
                                type="file"
                                id="file-input-subiect"
                                accept='.pdf'
                            />
                            <label
                                htmlFor="file-input-subiect"
                                className={`cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 
                                border rounded-lg px-4 py-2.5 transition-all duration-300 
                                ${errorFields.includes("subiect") ? "ring-2 ring-red-500" : "border-gray-400"}`}
                            >
                                <FaCamera className="text-[#5F5FDF]" /> 
                                <span className="ml-1">{subiect ? subiect.name.substring(0, 15) + "..." : "Inserează subiectul"}</span>
                            </label>
                        </div>

                        {/* Input barem */}
                        <div>
                            <input
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const validTypes = ["application/pdf"];
                                        if (validTypes.includes(file.type)) {
                                            setBarem(file);
                                        } else {
                                            showError("Doar fișiere PDF sunt permise!");
                                            e.target.value = "";
                                        }
                                    }
                                }}
                                type="file"
                                id="file-input-barem"
                                accept='.pdf'
                            />
                            <label
                                htmlFor="file-input-barem"
                                className={`cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 
                                border rounded-lg px-4 py-2.5 transition-all duration-300 
                                ${errorFields.includes("barem") ? "ring-2 ring-red-500" : "border-gray-400"}`}
                            >
                                <FaCamera className="text-[#5F5FDF]" /> 
                                <span className="ml-1">{barem ? barem.name.substring(0, 15) + "..." : "Inserează baremul"}</span>
                            </label>
                        </div>
                    </div>

                    {/* Buton de trimitere */}
                    <button
                        disabled={loading}
                        onClick={nextStep}
                        className="bg-[#5F5FDF] hover:bg-[#4747A9] text-white font-medium rounded-lg px-6 py-2.5 transition-colors duration-300 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" />
                                Se încarcă...
                            </>
                        ) : (
                            "Postează"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PosteazaSubiect;