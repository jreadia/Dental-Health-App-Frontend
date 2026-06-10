import { useState } from "react";

interface SignupPageProps {
  onBackToLogin: () => void;
  onAccountCreated: () => void;
}

const inputClass =
  "w-full rounded-xl px-4 py-3 outline-none text-sm bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/60 focus:bg-white/15 transition-all";

export function SignupPage({ onBackToLogin, onAccountCreated }: SignupPageProps) {
  const [username, setUsername] = useState("");
<<<<<<< HEAD
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
=======
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
>>>>>>> admin-page
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log("Sign up submitted:", { firstName, lastName, username, phoneNumber, address, birthday, password });
=======
    console.log("Sign up submitted:", { username, password, confirmPassword, firstname, lastname });
>>>>>>> admin-page
    onAccountCreated();
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-auto py-10 px-4"
      style={{ backgroundColor: "#d4d4e8" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
      </div>

<<<<<<< HEAD
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
              <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-3 py-2 rounded-xl text-xs text-center" style={{ fontWeight: "600" }}>
                {error}
              </div>
            )}

            {/* Personal Info */}
            <div>
              <p className="text-white/40 uppercase mb-2" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.2px" }}>
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
                {!birthday && <p className="text-white/40 mt-1 ml-1" style={{ fontSize: "10px" }}>Date of Birth</p>}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white/40 uppercase mb-2" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.2px" }}>
                Contact
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className={inputClass} required />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className={inputClass} required />
              </div>
            </div>

            {/* Account */}
            <div>
              <p className="text-white/40 uppercase mb-2" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.2px" }}>
                Account
              </p>
              <div className="space-y-2">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email/Username" className={inputClass} required />
                <div className="grid grid-cols-2 gap-2">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputClass} required />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm" className={inputClass} required />
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-red-300 ml-1" style={{ fontSize: "11px" }}>Passwords don't match</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl px-6 py-2.5 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", fontWeight: "700", fontSize: "14px" }}
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-white/60" style={{ fontSize: "13px" }}>
                Already have an account?{" "}
                <button type="button" onClick={onBackToLogin} className="text-white hover:underline" style={{ fontWeight: "600" }}>
                  Log in
                </button>
              </p>
=======
      {/* SIGN UP label */}
      <div className="absolute top-8 left-8 bg-[#00004d] text-white px-5 py-2 rounded-full" style={{ fontSize: '13px', fontWeight: '700' }}>
        SIGN UP
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-sm px-6 relative z-10">
        <div className="bg-[#00004d] rounded-2xl px-8 py-12 shadow-2xl">
          <h1 className="text-white text-center mb-8" style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '0.5px' }}>
            SIGN UP
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-0">
              <label htmlFor="username" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                USERNAME:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="firstname" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                FIRSTNAME:
              </label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="lastname" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                LASTNAME:
              </label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="password" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                PASSWORD:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="flex items-center gap-0">
              <label htmlFor="confirmPassword" className="text-white text-sm" style={{ fontWeight: '600', marginRight: '0' }}>
                CONFIRM PASSWORD:
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 rounded px-2 py-1 outline-none text-sm bg-white ml-1"
                style={{ fontWeight: '400' }}
                required
              />
            </div>

            <div className="pt-6 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-white text-sm hover:underline"
                style={{ fontWeight: '400' }}
              >
                Or Log In
              </button>

              <button
                type="submit"
                className="bg-white text-[#00004d] rounded px-4 py-1.5 hover:bg-gray-100 transition-colors text-xs"
                style={{ fontWeight: '700' }}
              >
                CREATE ACCOUNT
              </button>
              
            </div>

            <div className="text-center text-white text-xs pt-2" style={{ fontWeight: '400' }}>
>>>>>>> admin-page
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
