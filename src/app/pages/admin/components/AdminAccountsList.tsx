import React, { useState } from "react";
import { getAdminAccounts, removeAdminAccount } from "../../../adminAccounts";
import { StatusBadge } from "../../../components/ui/StatusBadge";

export function AdminAccountsList() {
  const [accounts, setAccounts] = useState(getAdminAccounts());
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function handleRemove(username: string) {
    removeAdminAccount(username);
    setAccounts(getAdminAccounts());
    setConfirmId(null);
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm text-[#0a2378] mb-2.5 font-bold tracking-widest">
        EXISTING ADMIN ACCOUNTS
      </h3>
      <div className="flex flex-col gap-2">
        {accounts.map((a, i) => (
          <div 
            key={i} 
            className="bg-blue-50 border border-blue-200 rounded-lg py-2.5 px-3.5 flex items-center justify-between gap-2"
          >
            <span className="font-bold text-[#0a2378] text-sm">{a.username}</span>
            
            {a.username === "josep" ? (
              <StatusBadge variant="superadmin">SUPER ADMIN</StatusBadge>
            ) : confirmId === a.username ? (
              <div className="flex gap-1.5">
                <span className="text-xs text-red-800 self-center mr-1">Remove?</span>
                <button 
                  onClick={() => handleRemove(a.username)} 
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
                onClick={() => setConfirmId(a.username)} 
                className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] rounded-md py-[5px] px-3 text-[12px] cursor-pointer font-sans hover:bg-blue-100 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
