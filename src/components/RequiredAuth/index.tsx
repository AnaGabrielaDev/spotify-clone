import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if(!auth.user) {
      navigator("/login", {
        state: { from: location },
        replace: true
      })
    }
  }, [auth.user, location, navigator])  
  
  return children;
}