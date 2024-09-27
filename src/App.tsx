import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const wasmSupported =
      typeof WebAssembly === "object" &&
      WebAssembly.validate(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
      );

    const stockfish = new Worker(
      wasmSupported ? "stockfish.wasm.js" : "stockfish.js"
    );

    stockfish.addEventListener("message", function (e) {
      console.log(e.data);
    });

    stockfish.postMessage("uci");
  }, []);

  return (
    <div>
      <p className="text-lg">Hi</p>
    </div>
  );
}
