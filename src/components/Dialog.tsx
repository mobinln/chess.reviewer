import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

export default function BaseDialog({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string | ReactNode;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-white flex">
              {title}
              <Button className="ml-auto" onClick={onClose}>
                <X className="text-black" />
              </Button>
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
