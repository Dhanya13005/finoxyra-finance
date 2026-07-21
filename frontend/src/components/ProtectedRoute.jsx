import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen bg-pine flex items-center justify-center">
        <p className="text-cream-dim text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
