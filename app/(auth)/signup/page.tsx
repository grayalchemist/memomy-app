"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    // Note: For the pitch MVP, we disabled email confirmation in Supabase options
    // so it logs you in immediately.
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // Create user record in our custom users table
      if (data.user) {
        const { error: insertError } = await supabase
          .from("users")
          .insert([
            { id: data.user.id, email: data.user.email }
          ]);

        if (insertError) {
          console.error("Error creating user record:", insertError);
        }
      }

      router.push("/dashboard"); // Redirect straight to dashboard for the Pitch Demo
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary">MeMomy</h1>
          <p className="mt-3 font-sans text-lg text-muted-foreground">Set up your account to continue.</p>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="font-serif text-2xl font-semibold">Create an account</CardTitle>
            <CardDescription className="font-sans">We keep your health data private and secure.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium">
                  {error}
                </div>
              )}
              {message && (
                <div className="rounded-md bg-accent/10 p-3 text-sm text-accent-foreground font-medium">
                  {message}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 focus-visible:ring-primary"
                />
                <p className="text-xs text-muted-foreground">Must be at least 6 characters.</p>
              </div>
              <Button type="submit" className="w-full font-bold bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-border/50 pt-6 font-sans text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
