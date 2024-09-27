import { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import useStockfish from "../hooks/useStockfish";
import useConfigStore from "../store/config";

function extractMove(str: string) {
  const match = str.split(" ")[1];
  return match;
}

export default function ChessBoard() {
  const playWithComputer = useConfigStore().playWithComputer;
  const computerDifficulty = useConfigStore().computerDifficulty;
  const setBestMovie = useConfigStore().setBestMovie;
  const [game, setGame] = useState(new Chess());

  const { startPosition, evaluate } = useStockfish({
    onMessage(data) {
      console.log(data);

      if (data.includes("bestmove")) {
        const move = extractMove(data);
        setBestMovie(move);

        if (playWithComputer && computerDifficulty !== "dumb") {
          makeAMove({
            from: move.slice(0, 2) as Square,
            to: move.slice(2, 4) as Square,
            promotion: "q",
          });
        } else if (playWithComputer && computerDifficulty === "dumb") {
          makeAMove();
        }
      }
    },
  });

  useEffect(() => {
    startPosition();
  }, [startPosition]);

  function makeAMove(move?: string | { from: Square; to: Square; promotion: string }) {
    const gameCopy = new Chess(game.fen());
    if (!move) {
      const possibilities = gameCopy.moves();
      const index = Math.floor(Math.random() * possibilities.length);
      move = possibilities[index];
      const result = gameCopy.move(move);

      if (result === null) return;
      setGame(gameCopy);

      return result;
    }
    const result = gameCopy.move(move);

    if (result === null) return;
    setGame(gameCopy);

    if (gameCopy.turn() === "w") {
      return;
    }

    if (gameCopy.isGameOver()) {
      console.log("Game Over", gameCopy);
      return result;
    }
    if (gameCopy.isDraw()) {
      console.log("Draw", gameCopy);
      return result;
    }

    evaluate({
      fen: gameCopy.fen(),
      depth: computerDifficulty === "regular" ? 2 : computerDifficulty === "GOD" ? 15 : 1,
    });

    return result;
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    return true;
  }

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onDrop}
      customDarkSquareStyle={{
        backgroundColor: "#779952",
      }}
      customLightSquareStyle={{
        backgroundColor: "#edeed1",
      }}
    />
  );
}
