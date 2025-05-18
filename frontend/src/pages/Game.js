import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
  const [showModal, setShowModal] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const { 
    unityProvider, 
    isLoaded, 
    loadingProgression,
    sendMessage 
  } = useUnityContext({
    loaderUrl: "/unity/game/GAMES.loader.js",
    dataUrl: "/unity/game/GAMES.data.unityweb",
    frameworkUrl: "/unity/game/GAMES.framework.js.unityweb",
    codeUrl: "/unity/game/GAMES.wasm.unityweb",
  });

  const startGame = () => {
    setShowModal(false);
    setIsGameStarted(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#f5f7ff]">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f5f7ff] z-10">
          <div className="w-64 h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5F5FDF] to-[#7347AB] rounded-full transition-all duration-300"
              style={{ width: `${Math.round(loadingProgression * 100)}%` }}
            ></div>
          </div>
          <p className="text-[#4747A9] font-medium">
            Încărcare joc... {Math.round(loadingProgression * 100)}%
          </p>
        </div>
      )}

      {showModal && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 m-4 transform transition-all animate-fadeIn">
            <div className="bg-gradient-to-r from-[#5F5FDF] to-[#7347AB] text-white p-4 -mt-6 -mx-6 mb-6 rounded-t-xl">
              <h2 className="text-xl font-bold">Bine ai venit la Settera!</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Explorează și învață geografia într-un mod interactiv și distractiv.
              </p>
              
              <div className="bg-[#f5f7ff] p-4 rounded-lg border border-[#e0e6ff]">
                <h3 className="font-semibold text-[#4747A9] mb-2">Instrucțiuni de joc:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Apasă pe <span className="font-medium">Europa</span> pentru a începe jocul</li>
                  <li>Identifică și apasă pe megalopolisurile indicate pe hartă</li>
                  <li>Acumulează puncte pentru fiecare răspuns corect</li>
                  <li>Roteste globul cu butonul stang al mouseului</li>
                </ol>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5F5FDF] to-[#7347AB] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <button
                    onClick={startGame}
                    className="relative bg-gradient-to-r from-[#5F5FDF] to-[#7347AB] text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Începe Jocul
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Sfat: Folosește zoom-ul pentru a vedea mai detaliat regiunile mai mici..
              </p>
            </div>
          </div>
        </div>
      )}

      <Unity
        unityProvider={unityProvider}
        className="w-full h-full"
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
      />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Game;