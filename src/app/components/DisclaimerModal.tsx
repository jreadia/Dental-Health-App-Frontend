import React from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { AlertTriangle } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton className="text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-amber-500" />
      </div>
      <h3 className="text-xl font-bold text-[#00004d] mb-3">Disclaimer</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        This tool is part of a student/academic project and is <span className="font-semibold">not based on a clinical study</span> or
        validated medical research. The results shown are for demonstration purposes only and should
        <span className="font-semibold"> not be used as a substitute for professional dental advice, diagnosis, or treatment</span>.
        Please consult a licensed dentist or doctor for any concerns about your dental health.
      </p>
      <Button
        onClick={onClose}
        className="w-full py-3 rounded-xl"
        size="lg"
      >
        I Understand, Continue
      </Button>
    </Modal>
  );
}
