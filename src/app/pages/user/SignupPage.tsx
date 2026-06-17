import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/ui/PageLayout";
import { Button } from "../../components/ui/Button";

const inputClass =
  "w-full rounded-xl px-4 py-3 outline-none text-sm bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/60 focus:bg-white/15 transition-all";

export function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const { registerUser } = await import("../../../api/auth");
      const res = await registerUser({
        firstName,
        lastName,
        email: username,
        password,
        phoneNumber,
        address,
        birthday
      });
      navigate('/success', { state: { wasExistingUser: res?.user?.wasExistingUser } });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout variant="blobs" className="flex items-center justify-center py-10 px-4">
      {/* SIGN UP badge */}
      <div
        className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full shadow-lg z-20"
        style={{ fontSize: "13px", fontWeight: "700" }}
      >
        SIGN UP
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#00004d] rounded-3xl px-8 py-7 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-white mb-0.5" style={{ fontSize: "22px", fontWeight: "700" }}>
              Create Account
            </h1>
            <p className="text-white/60" style={{ fontSize: "13px" }}>
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-3 py-2 rounded-xl text-xs text-center font-semibold">
                {error}
              </div>
            )}

            {/* Personal Info */}
            <div>
              <p className="text-white/40 uppercase mb-2 text-[10px] font-bold tracking-[1.2px]">
                Personal Info
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className={inputClass} required />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className={inputClass} required />
              </div>
              <div className="mt-2">
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className={inputClass}
                  style={{ colorScheme: "dark" }}
                  title="Birthday"
                  required
                />
                {!birthday && <p className="text-white/40 mt-1 ml-1 text-[10px]">Date of Birth</p>}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white/40 uppercase mb-2 text-[10px] font-bold tracking-[1.2px]">
                Contact
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className={inputClass} required />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className={inputClass} required />
              </div>
            </div>

            {/* Account */}
            <div>
              <p className="text-white/40 uppercase mb-2 text-[10px] font-bold tracking-[1.2px]">
                Account
              </p>
              <div className="space-y-2">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" className={inputClass} required />
                <div className="grid grid-cols-2 gap-2">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputClass} required />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm" className={inputClass} required />
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-red-300 ml-1 text-[11px]">Passwords don't match</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" variant="gradient" className="w-full rounded-xl py-2.5 h-auto" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <div className="text-center">
              <p className="text-white/60 text-[13px]">
                Already have an account?{" "}
                <button type="button" onClick={() => navigate('/login')} className="text-white hover:underline font-semibold cursor-pointer">
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
