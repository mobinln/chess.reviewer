import { Settings } from "lucide-react";
import BaseDialog from "../components/Dialog";
import Switch from "../components/Switch";
import useConfigStore, { GameDifficulties } from "../store/config";

export default function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const computerDifficulty = useConfigStore().computerDifficulty;
  const playWithComputer = useConfigStore().playWithComputer;
  const setPlayWithComputer = useConfigStore().setPlayWithComputer;
  const setComputerDifficulty = useConfigStore().setComputerDifficulty;

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={
        <div className="flex gap-2">
          <Settings />
          <p>Settings</p>
        </div>
      }
    >
      <div className="flex gap-2 mt-2">
        <p className="w-40">Play with computer</p>
        <Switch checked={playWithComputer} onChange={setPlayWithComputer} />
      </div>
      <div className="flex gap-2 mt-2">
        <p className="w-40">Computer Difficulty</p>
        <select
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={computerDifficulty}
          onChange={(e) => setComputerDifficulty(e.target.value as GameDifficulties)}
        >
          <option value="dumb">Dumb</option>
          <option value="regular">Regular</option>
          <option value="GOD">GOD</option>
        </select>
      </div>
    </BaseDialog>
  );
}
