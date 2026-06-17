/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getUsers, updateUserStatus, removeUser, User } from '../../../../api/users';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Modal } from '../../../components/ui/Modal';

interface UserManagementTableProps {
  onStatsChange: () => void;
}

export function UserManagementTable({ onStatsChange }: UserManagementTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [userToRemove, setUserToRemove] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const fetchUsers = async (pageIndex: number, search: string) => {
    setLoading(true);
    try {
      const currentCursor = cursors[pageIndex];
      const res = await getUsers({ limit: 5, cursor: currentCursor, search });
      setUsers(res.users);
      setHasMore(res.hasMore);
      
      // Save next cursor
      if (res.hasMore && res.nextCursor) {
        setCursors(prev => {
          const newCursors = [...prev];
          newCursors[pageIndex + 1] = res.nextCursor;
          return newCursors;
        });
      }
    } catch (e) {
      console.error("Failed to fetch users", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers(0, searchQuery);
  }, [searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue);
      setCurrentPage(0);
      setCursors([null]);
    }
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
    setCurrentPage(0);
    setCursors([null]);
  };

  const handleNextPage = () => {
    if (hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchUsers(nextPage, searchQuery);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchUsers(prevPage, searchQuery);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const currentStatus = user.status || 'ACTIVE';
    // If active -> inactive, if inactive/banned -> active
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await updateUserStatus(user.userId, newStatus);
      setUsers(users.map(u => u.userId === user.userId ? { ...u, status: newStatus } : u));
      onStatsChange();
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleRemoveClick = (userId: string) => {
    setUserToRemove(userId);
  };

  const confirmRemove = async () => {
    if (!userToRemove) return;
    setIsRemoving(true);
    try {
      await removeUser(userToRemove);
      fetchUsers(currentPage, searchQuery);
      onStatsChange();
      setUserToRemove(null);
    } catch (e) {
      console.error("Failed to remove user", e);
    } finally {
      setIsRemoving(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (dateVal: any) => {
    if (!dateVal) return '-';
    if (typeof dateVal === 'string') return new Date(dateVal).toISOString().split('T')[0];
    if (dateVal._seconds) return new Date(dateVal._seconds * 1000).toISOString().split('T')[0];
    return '-';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-2 relative">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          type="text" 
          placeholder="Search by email address" 
          className="w-full outline-none text-gray-700 placeholder-gray-400 pr-8"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        {(inputValue || searchQuery) && (
          <button 
            onClick={handleClearSearch}
            className="absolute right-4 p-1.5 bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center"
            title="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[#0a2378] text-xs font-bold uppercase tracking-wider">
              <th className="p-4 py-3 w-[5%]">ID</th>
              <th className="p-4 py-3 w-[20%]">Name</th>
              <th className="p-4 py-3 w-[25%]">Email</th>
              <th className="p-4 py-3 w-[15%]">Status</th>
              <th className="p-4 py-3 w-[15%]">Joined</th>
              <th className="p-4 py-3 w-[10%]">Action</th>
              <th className="p-4 py-3 w-[10%]">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => {
                // Determine row number for display purposes
                const displayId = (currentPage * 5) + index + 1;
                const status = user.status || 'ACTIVE';
                
                return (
                  <tr key={user.userId} className="hover:bg-gray-50/50 transition-colors text-sm">
                    <td className="p-4 text-gray-500">{displayId}</td>
                    <td className="p-4 text-gray-800 font-medium">{`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No Name'}</td>
                    <td className="p-4 text-gray-500">{user.email}</td>
                    <td className="p-4">
                      <StatusBadge status={status}>{status}</StatusBadge>
                    </td>
                    <td className="p-4 text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleToggleStatus(user)}
                        className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                          status === 'ACTIVE' 
                            ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                            : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                        }`}
                      >
                        {status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleRemoveClick(user.userId)}
                        className="px-3 py-1.5 rounded text-xs font-medium border bg-red-50 text-red-600 border-red-200 hover:bg-red-100 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 0 || loading}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">Page {currentPage + 1}</span>
        <button 
          onClick={handleNextPage}
          disabled={!hasMore || loading}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      <Modal 
        isOpen={userToRemove !== null} 
        onClose={() => setUserToRemove(null)}
        title="Remove User"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to completely remove this user account? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setUserToRemove(null)}
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
