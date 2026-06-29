export interface User {
  name: string;
  email: string;
  favoriteTeam?: string;
}

const USERS_KEY = "fifa_users";
const SESSION_KEY = "fifa_session";

export function getUsers(): Record<string, { name: string; password: string; favoriteTeam?: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveUser(email: string, name: string, password: string, favoriteTeam?: string): boolean {
  const users = getUsers();
  if (users[email]) return false;
  users[email] = { name, password, favoriteTeam };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function validateUser(email: string, password: string): { name: string; email: string; favoriteTeam?: string } | null {
  const users = getUsers();
  const user = users[email];
  if (!user || user.password !== password) return null;
  const session: User = { name: user.name, email, favoriteTeam: user.favoriteTeam };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
