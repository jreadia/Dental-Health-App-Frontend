import React, { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSave() {
    if (!form.email.trim() || !form.password.trim()) return;
    try {
      const { registerAdmin } = await import("../../../../api/auth");
      await registerAdmin({
        firstName: "Admin",
        lastName: "User",
        email: form.email.trim(),
        password: form.password.trim()
      });
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create admin");
      setStatus("error");
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Admin Account">
      {status === "success" ? (
        <div className="text-green-800 bg-green-100 px-4 py-3 rounded-lg text-sm mb-4">
          ✓ Admin <strong>{form.email}</strong> created! They can now log in with the admin interface.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {status === "error" && (
            <p className="text-red-800 bg-red-100 px-3 py-2 rounded-md text-sm">
              ⚠ {errorMessage}
            </p>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest text-slate-500">EMAIL</label>
            <input
              className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none w-full focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
              type="email"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setStatus("idle"); }}
              placeholder="New admin email"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest text-slate-500">PASSWORD</label>
            <input
              className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none w-full focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
              type="password"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setStatus("idle"); }}
              placeholder="Set password"
            />
          </div>
          
          <Button onClick={handleSave} className="w-full mt-2" size="lg">
            Save Account
          </Button>
          <Button onClick={onClose} variant="secondary" className="w-full" size="lg">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}
