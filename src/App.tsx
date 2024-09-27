import { Menu } from "lucide-react";

import Card from "./components/Card";
import ChessBoard from "./modules/ChessBoard";
import Palette from "./constants/theme";
import SettingsDialog from "./modules/SettingsDialog";
import { useState } from "react";

export default function App() {
  const [settingsDialog, setSettingsDialog] = useState(false);

  return (
    <>
      <SettingsDialog open={settingsDialog} onClose={() => setSettingsDialog(false)} />
      <div className="w-screen h-screen flex flex-col" style={{ backgroundColor: Palette.dark }}>
        <div className="m-2">
          <button className="rounded p-2" style={{ color: Palette.primary }} onClick={() => setSettingsDialog(true)}>
            <Menu />
          </button>
        </div>
        <Card className="self-center my-auto">
          <div
            style={{ width: "99vw", maxWidth: "80vh", height: "auto", borderColor: Palette.dark }}
            className="border-2"
          >
            <ChessBoard />
          </div>
        </Card>
        <p className="text-white self-center my-2">
          Created with ❤️ by
          <a href="https://mobinln.github.io/" className="italic mx-1" style={{ color: Palette.primary }}>
            mobinln
          </a>
        </p>
      </div>
    </>
  );
}
