import React, { useState, useEffect } from "react";
import { getAdmins, deleteAdmin } from "../../../../api/admins";
import { StatusBadge } from "../../../components/ui/StatusBadge";

export function AdminAccountsList() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const data = await getAdmins();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch admins", e);
    }
  }

  async function handleRemove(id: string) {
    try {
      await deleteAdmin(id);
      await fetchAccounts();
    } catch (e) {
      console.error("Failed to delete admin", e);
    }
    setConfirmId(null);
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm text-[#0a2378] mb-2.5 font-bold tracking-widest">
        EXISTING ADMIN ACCOUNTS
      </h3>
      <div className="flex flex-col gap-2">
        {accounts.map((a: any) => {
          const id = a.id || a.uid || a._id;
          return (
            <div 
              key={id} 
              className="bg-blue-50 border border-blue-200 rounded-lg py-2.5 px-3.5 flex items-center justify-between gap-2"
            >
              <span className="font-bold text-[#0a2378] text-sm">{a.email || a.username || "Unknown Admin"}</span>
              
              {a.email === "josep@example.com" ? (
                <StatusBadge variant="superadmin">SUPER ADMIN</StatusBadge>
              ) : confirmId === id ? (
                <div className="flex gap-1.5">
                  <span className="text-xs text-red-800 self-center mr-1">Remove?</span>
                  <button 
                    onClick={() => handleRemove(id)} 
                    className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] rounded-md py-[5px] px-3 text-[12px] cursor-pointer font-sans hover:bg-blue-100 transition-colors"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setConfirmId(null)} 
                    className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] rounded-md py-[5px] px-3 text-[12px] cursor-pointer font-sans hover:bg-blue-100 transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setConfirmId(id)} 
                  className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] rounded-md py-[5px] px-3 text-[12px] cursor-pointer font-sans hover:bg-blue-100 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
