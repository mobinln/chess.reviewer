import ChessBoard from "./components/ChessBoard";
import Palette from "./constants/theme";

export default function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ backgroundColor: Palette.dark }}>
      <div style={{ width: "70vw", height: "auto", borderColor: Palette.primary }} className="border-2 rounded-lg">
        <ChessBoard />
      </div>
    </div>
  );
}
