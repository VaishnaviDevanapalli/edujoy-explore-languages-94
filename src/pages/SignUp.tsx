import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // For demo purposes, we'll simulate sending a verification email
      setVerificationSent(true);
      // In a real app, you would send an actual verification email here
      toast.success("Verification email sent! Please check your inbox.");
      
      // Store pending verification status
      localStorage.setItem("pendingVerification", email);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleVerificationConfirm = () => {
    // For demo purposes, we'll simulate email verification
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    localStorage.removeItem("pendingVerification");
    toast.success("Email verified successfully!");
    navigate("/translate");
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F2FCE2] via-[#FEF7CD] to-[#FDE1D3] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Card className="w-[350px] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              Verify Your Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F2FCE2] via-[#FEF7CD] to-[#FDE1D3] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
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
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Button variant="link" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}