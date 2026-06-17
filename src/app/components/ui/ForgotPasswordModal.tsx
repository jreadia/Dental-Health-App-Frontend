import React, { useState } from "react";
import { X, Mail, CheckCircle, Info } from "lucide-react";
import { Button } from "./Button";
import { sendPasswordResetEmail } from "../../../api/auth";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSharedAccount, setIsSharedAccount] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await sendPasswordResetEmail(email) as { isSharedAccount?: boolean };
      setIsSharedAccount(!!res?.isSharedAccount);
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || "Failed to send reset email.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setStatus("error");
    }
  };

  const handleClose = () => {
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
    setIsSharedAccount(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00004d]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#00004d]">Reset Password</h2>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-6 text-sm">
                If an account exists for <strong>{email}</strong>, we've sent instructions to reset your password.
              </p>

              {isSharedAccount && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-blue-800 text-sm">Important Notice</span>
                  </div>
                  <p className="text-blue-600/90 text-xs leading-relaxed">
                    Since Admins and Users share the same login system, resetting your password here will update it for <strong>both</strong> portals.
                  </p>
                </div>
              )}

              <Button onClick={handleClose} variant="default" className="w-full py-2.5">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-gray-600 text-sm mb-2">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>

              {status === "error" && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100">
                  {errorMessage}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]/30 transition-all"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="default" 
                className="w-full py-2.5 mt-2"
                disabled={status === "loading" || !email}
              >
                {status === "loading" ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
