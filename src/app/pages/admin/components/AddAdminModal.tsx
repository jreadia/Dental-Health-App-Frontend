import React, { useState } from "react";
import { addAdminAccount } from "../../../adminAccounts";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export function AddAdminModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<"idle" | "success" | "duplicate">("idle");

  function handleSave() {
    if (!form.username.trim() || !form.password.trim()) return;
    const success = addAdminAccount(form.username.trim(), form.password.trim());
    setStatus(success ? "success" : "duplicate");
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Admin Account">
      {status === "success" ? (
        <div className="text-green-800 bg-green-100 px-4 py-3 rounded-lg text-sm mb-4">
          ✓ Admin <strong>{form.username}</strong> created! They can now log in with the admin interface.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {status === "duplicate" && (
            <p className="text-red-800 bg-red-100 px-3 py-2 rounded-md text-sm">
              ⚠ Username already exists. Choose a different one.
            </p>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest text-slate-500">USERNAME</label>
            <input
              className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none w-full focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
              value={form.username}
              onChange={(e) => { setForm({ ...form, username: e.target.value }); setStatus("idle"); }}
              placeholder="New admin username"
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
