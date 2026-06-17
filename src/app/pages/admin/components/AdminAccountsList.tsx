import React, { useState, useEffect } from "react";
import { getAdmins, deleteAdmin } from "../../../../api/admins";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Modal } from "../../../components/ui/Modal";

interface AdminAccount {
  id?: string;
  adminId?: string;
  uid?: string;
  _id?: string;
  email?: string;
  username?: string;
  role?: string;
}

export function AdminAccountsList() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  async function fetchAccounts() {
    try {
      const data = await getAdmins() as { admins?: AdminAccount[] } | AdminAccount[];
      const accountsArray = data && typeof data === 'object' && 'admins' in data ? data.admins : data;
      setAccounts(Array.isArray(accountsArray) ? accountsArray : []);
    } catch (e) {
      console.error("Failed to fetch admins", e);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAccounts();
  }, []);

  async function confirmRemove() {
    if (!confirmId) return;
    setIsRemoving(true);
    try {
      await deleteAdmin(confirmId);
      await fetchAccounts();
    } catch (e) {
      console.error("Failed to delete admin", e);
    } finally {
      setIsRemoving(false);
      setConfirmId(null);
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm text-[#0a2378] mb-2.5 font-bold tracking-widest">
        EXISTING ADMIN ACCOUNTS
      </h3>
      <div className="flex flex-col gap-2">
        {accounts.map((a: AdminAccount) => {
          const id = a.adminId || a.id || a.uid || a._id || "";
          return (
            <div 
              key={id} 
              className="bg-blue-50 border border-blue-200 rounded-lg py-2.5 px-3.5 flex items-center justify-between gap-2"
            >
              <span className="font-bold text-[#0a2378] text-sm">{a.email || a.username || "Unknown Admin"}</span>
              
              {a.role === 'super_admin' ? (
                <StatusBadge variant="superadmin">SUPER ADMIN</StatusBadge>
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

      {/* Confirmation Modal */}
      <Modal 
        isOpen={confirmId !== null} 
        onClose={() => setConfirmId(null)}
        title="Remove Admin"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this administrator account? They will lose all access to the admin dashboard.
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setConfirmId(null)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isRemoving}
          >
            Cancel
          </button>
          <button 
            onClick={confirmRemove}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center min-w-[80px]"
            disabled={isRemoving}
          >
            {isRemoving ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Remove"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
