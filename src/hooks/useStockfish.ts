import { useEffect, useState } from "react";

export default function useStockfish({ onMessage }: { onMessage: (data: string) => void }) {
  const [stockfish, setStockfish] = useState<Worker>();
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!stockfish) {
      const wasmSupported =
        typeof WebAssembly === "object" &&
        WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));

      const stockfishWorker = new Worker(wasmSupported ? "stockfish.wasm.js" : "stockfish.js");

      setStockfish(stockfishWorker);
    }
  }, [stockfish]);

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      setMessages((p) => [...p, e.data]);
      onMessage(e.data);
    };
    if (stockfish) {
      stockfish.addEventListener("message", messageHandler);
    }
    return () => {
      stockfish?.removeEventListener("message", messageHandler);
    };
  }, [onMessage, stockfish]);

  const sendToStockfish = (cmd: string) => {
    stockfish?.postMessage(cmd);
  };

  const startPosition = () => {
    if (started) {
      return;
    }
    sendToStockfish("uci"); // Initialize the UCI mode
    sendToStockfish("isready"); // Check if the engine is ready
    sendToStockfish("setoption name MultiPV value 2");
    setStarted(true);
  };

  const evaluate = ({ fen, depth = 15 }: { fen: string; depth?: number }) => {
    sendToStockfish(`position fen ${fen}`);

    sendToStockfish(`go depth ${depth}`);
  };

  return { stockfish, messages, started, sendToStockfish, startPosition, evaluate };
}
