import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity/game/GAMES.loader.js",
    dataUrl: "/unity/game/GAMES.data.gz",
    frameworkUrl: "/unity/game/GAMES.framework.js.gz",
    codeUrl: "/unity/game/GAMES.wasm.gz",
  });

  return (
    <div>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}

export default Game;
