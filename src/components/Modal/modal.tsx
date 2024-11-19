import { ReactNode } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white py-3 px-7 rounded-md z-10 w-auto max-h-[90%] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          <IoMdCloseCircleOutline size={25} color="#66DF26" />
        </button>
        {children}
      </div>
    </div>
  );
}
