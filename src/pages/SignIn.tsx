import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // For demo purposes, simulate sending a verification email
      setVerificationSent(true);
      localStorage.setItem("pendingSignInVerification", email);
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const handleVerificationConfirm = () => {
    // For demo purposes, simulate email verification
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    localStorage.removeItem("pendingSignInVerification");
    toast.success("Successfully signed in!");
    navigate("/translate");
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F2FCE2] via-[#FEF7CD] to-[#FDE1D3]">
        <Card className="w-[350px] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              Verify Your Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              We've sent a verification email to {email}. Please check your inbox and click the verification link.
            </p>
            {/* For demo purposes, we'll add a button to simulate verification */}
            <Button onClick={handleVerificationConfirm} className="w-full">
              Simulate Email Verification
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F2FCE2] via-[#FEF7CD] to-[#FDE1D3]">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            Sign in to EduLang
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}