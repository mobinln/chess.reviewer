import clsx from "clsx";
import { ReactNode } from "react";
import Palette from "../constants/theme";

export default function Card({ children, className }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={clsx(className, "shadow-lg rounded-lg border-2")}
      style={{ background: Palette.light, borderColor: Palette.primary }}
    >
      {children}
    </div>
  );
}
