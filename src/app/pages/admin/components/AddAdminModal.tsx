import React, { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "success" | "success_existing" | "duplicate" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSave() {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password.trim()) return;
    try {
      const { registerAdmin } = await import("../../../../api/auth");
      const response = await registerAdmin({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password.trim()
      });
      if (response?.admin?.wasExistingUser || response?.wasExistingUser) {
        setStatus("success_existing");
      } else {
        setStatus("success");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || "Failed to create admin");
      } else {
        setErrorMessage("Failed to create admin");
      }
      setStatus("error");
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Admin Account">
      {status === "success" || status === "success_existing" ? (
        <div className="flex flex-col gap-3 mb-4">
          <div className="text-green-800 bg-green-100 px-4 py-3 rounded-lg text-sm">
            ✓ Admin <strong>{form.email}</strong> created! They can now log in with the admin interface.
          </div>
          {status === "success_existing" && (
            <div className="text-blue-800 bg-blue-100 px-4 py-3 rounded-lg text-sm border border-blue-200 shadow-sm">
              <span className="font-bold flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                Important Notice
              </span>
              This user already had an existing account. To prevent conflicts, the password you just entered was <strong>ignored</strong>. They should continue using their original password to log into the Admin portal.
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {status === "error" && (
            <p className="text-red-800 bg-red-100 px-3 py-2 rounded-md text-sm">
              ⚠ {errorMessage}
            </p>
          )}

          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-bold tracking-widest text-slate-500">FIRST NAME</label>
              <input
                className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none w-full focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
                type="text"
                value={form.firstName}
                onChange={(e) => { setForm({ ...form, firstName: e.target.value }); setStatus("idle"); }}
                placeholder="First Name"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-bold tracking-widest text-slate-500">LAST NAME</label>
              <input
                className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none w-full focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
                type="text"
                value={form.lastName}
                onChange={(e) => { setForm({ ...form, lastName: e.target.value }); setStatus("idle"); }}
                placeholder="Last Name"
              />
            </div>
          </div>
          
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
