import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const pendingVerification = localStorage.getItem("pendingVerification");
    
    if (pendingVerification) {
      toast.error("Please verify your email first");
      navigate("/signup");
      return;
    }
    
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [navigate]);

  return <>{children}</>;
}