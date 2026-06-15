import React from "react"
import { cn } from "./Button"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, title, children, className, hideCloseButton = false }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
      <div className={cn("bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative", className)}>
        {!hideCloseButton && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        {title && (
          <h2 className="text-xl font-bold text-[#0a2378] mb-4 pr-6">
            {title}
          </h2>
        )}
        
        {children}
      </div>
    </div>
  );
}
