import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "finoxyra_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setInitializing(false);
  }, []);

  // NOTE: mock implementation. Once the backend Auth module is live at
  // /api/auth/register and /api/auth/login, replace the body of these two
  // functions with real fetch() calls that return { token, fullName, email, role }.
  async function register({ fullName, email, password }) {
    await new Promise((r) => setTimeout(r, 500));
    if (!fullName || !email || !password) {
      throw new Error("All fields are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const fakeUser = { fullName, email, role: "USER", token: "mock-token-" + Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    setUser(fakeUser);
    return fakeUser;
  }

  async function login({ email, password }) {
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const fakeUser = { fullName: email.split("@")[0], email, role: "USER", token: "mock-token-" + Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    setUser(fakeUser);
    return fakeUser;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, initializing, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
