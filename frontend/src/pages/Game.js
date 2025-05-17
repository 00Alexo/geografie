import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "unity/Build/Game.loader.js",
    dataUrl: "unity/Build/Game.data",
    frameworkUrl: "unity/Build/Game.framework.js",
    codeUrl: "unity/Build/Game.wasm",
  });

  return (
    <div>
      {!isLoaded && <p>Loading... {Math.round(loadingProgression * 100)}%</p>}
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}

export default Game;
