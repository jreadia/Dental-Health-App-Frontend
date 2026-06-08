const STORAGE_KEY = "admin_accounts";

export interface AdminAccount {
  username: string;
  password: string;
}

export function getAdminAccounts(): AdminAccount[] {
  const base: AdminAccount[] = [{ username: "josep", password: "josep" }];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const extra: AdminAccount[] = JSON.parse(stored);
      return [...base, ...extra];
    }
  } catch {}
  return base;
}

export function addAdminAccount(username: string, password: string): boolean {
  try {
    const all = getAdminAccounts();
    if (all.find(a => a.username === username)) return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    const extra: AdminAccount[] = stored ? JSON.parse(stored) : [];
    extra.push({ username, password });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extra));
    return true;
  } catch {
    return false;
  }
}

export function isAdminAccount(username: string, password: string): boolean {
  return getAdminAccounts().some(a => a.username === username && a.password === password);
}

export function isSecretTrigger(username: string, password: string): boolean {
  return username === "josep" && password === "josep";
}
