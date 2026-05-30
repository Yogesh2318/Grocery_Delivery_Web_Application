"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/user-store";
import color_corrot from "@/public/color_carrot.svg"
import bw_corrot from "@/public/bw_carrot.svg"
import onboarding_screen from "@/public/onboarding_screen.svg"
import c_logo from "@/public/c_logo.svg"
const countries = [
  { code: "+880", label: "Bangladesh", flag: "BD" },
  { code: "+91", label: "India", flag: "IN" },
  { code: "+1", label: "United States", flag: "US" },
  { code: "+44", label: "United Kingdom", flag: "UK" },
  { code: "+971", label: "United Arab Emirates", flag: "AE" },
];

function BackButton() {
  return (
    <button
      className="grid h-9 w-9 place-items-center text-2xl text-[#111827]"
      type="button"
      aria-label="Go back"
    >
      &lsaquo;
    </button>
  );
}

function CarrotLogo({ light = true }: { light?: boolean }) {
  return (
    <div className="mx-auto h-12 w-12">
      {light ? (
        <img src={color_corrot.src} alt="Carrot Logo" className="h-full w-full" />
      ) : (
        <img src={c_logo.src} alt="Carrot Logo" className="h-full w-full" />
      )}
    </div>
  );
}

function AuthFrame({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,#fff0ee_0,#ffffff_26%,transparent_48%),radial-gradient(circle_at_88%_0%,#edf8f1_0,#ffffff_32%,transparent_52%)] text-[#111827] lg:bg-[#f6f7f2] lg:px-8 lg:py-8">
      <section className="mx-auto grid min-h-screen w-full overflow-hidden bg-white lg:min-h-[calc(100vh-64px)] lg:max-w-6xl lg:grid-cols-[0.95fr_1.05fr] lg:rounded-[8px] lg:border lg:border-[#dfe7d9] lg:shadow-sm lg:shadow-black/5">
        <div className="hidden bg-[#53B878] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="mt-6 text-sm font-semibold uppercase">Ahoum Fresh</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">{title}</h1>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[8px] bg-white/15">
            <div className="absolute left-1/2 top-10 h-44 w-36 -translate-x-1/2 rounded-t-full bg-[#f4d8bf]" />
            <div className="absolute left-1/2 top-14 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f0c39e]" />
            <div className="absolute left-1/2 top-28 h-28 w-32 -translate-x-1/2 rounded-[20px] bg-[#315a39]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
        <div className="flex min-h-screen flex-col lg:min-h-0">{children}</div>
      </section>
    </main>
  );
}

function EditableField({
  label,
  value,
  onChange,
  type = "text",
  trailing,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "email" | "password" | "text";
  trailing?: React.ReactNode;
}) {
  return (
    <label className="block border-b border-[#e8e8e8] pb-3">
      <span className="block text-xs font-medium text-[#777b82]">{label}</span>
      <span className="mt-3 flex items-center justify-between gap-3 text-sm">
        <input
          className="min-w-0 flex-1 bg-transparent font-semibold text-[#111827] outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
        />
        {trailing}
      </span>
    </label>
  );
}

function NumberKeyboard({
  onDigit,
  onDelete,
}: {
  onDigit: (digit: string) => void;
  onDelete: () => void;
}) {
  const rows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "del"],
  ];

  return (
    <div className="mt-auto bg-[#e8e6ec] px-1 pb-3 pt-1">
      {rows.map((row) => (
        <div key={row.join("-")} className="grid grid-cols-3 gap-1 py-0.5">
          {row.map((key) => {
            if (!key) {
              return <span key="empty" />;
            }

            return (
              <button
                key={key}
                className="h-12 rounded-[4px] bg-white text-center text-xl font-medium text-[#111827] shadow-sm active:bg-[#f2f5ee]"
                type="button"
                onClick={() => {
                  if (key === "del") {
                    onDelete();
                    return;
                  }

                  onDigit(key);
                }}
              >
                {key === "del" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function NumberScreen() {
  const router = useRouter();
  const signupDraft = useUserStore((state) => state.signupDraft);
  const setSignupDraft = useUserStore((state) => state.setSignupDraft);
  const defaultCountry =
    countries.find((country) => signupDraft.phone.startsWith(country.code)) ??
    countries[0];
  const [countryCode, setCountryCode] = useState(defaultCountry.code);
  const [localNumber, setLocalNumber] = useState(
    signupDraft.phone.replace(defaultCountry.code, "").replace(/\D/g, ""),
  );

  const handleNext = () => {
    if (localNumber.length < 6) {
      return;
    }

    setSignupDraft({ phone: `${countryCode}${localNumber}` });
    router.push("/auth/verification");
  };

  return (
    <AuthFrame title="Enter your mobile number">
      <BackButton />
      <section className="relative flex flex-1 flex-col px-6 pt-12">
        <h1 className="text-2xl font-semibold">Enter your mobile number</h1>
        <label className="mt-9 block border-b border-[#e8e8e8] pb-3">
          <span className="block text-xs font-medium text-[#777b82]">
            Mobile Number
          </span>
          <span className="mt-3 flex items-center gap-3 text-sm">
            <select
              className="h-8 rounded-[6px] border border-[#dfe7d9] bg-white px-2 text-xs font-bold outline-none"
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
              aria-label="Country code"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              className="min-w-0 flex-1 bg-transparent font-semibold outline-none"
              value={localNumber}
              onChange={(event) =>
                setLocalNumber(event.target.value.replace(/\D/g, ""))
              }
              aria-label="Mobile number"
              inputMode="numeric"
            />
          </span>
        </label>
        <button
          className="absolute bottom-[174px] right-6 grid h-16 w-16 place-items-center rounded-full bg-[#53B878] text-3xl font-light text-white shadow-lg shadow-[#53B878]/30"
          type="button"
          onClick={handleNext}
          aria-label="Continue to verification"
        >
          &rsaquo;
        </button>
        <NumberKeyboard
          onDigit={(digit) =>
            setLocalNumber((current) => `${current}${digit}`.slice(0, 12))
          }
          onDelete={() =>
            setLocalNumber((current) =>
              current.slice(0, Math.max(0, current.length - 1)),
            )
          }
        />
      </section>
    </AuthFrame>
  );
}

export function VerificationScreen() {
  const router = useRouter();
  const setSignupDraft = useUserStore((state) => state.setSignupDraft);
  const [code, setCode] = useState("");

  const handleNext = () => {
    if (code.trim().length < 4) {
      return;
    }

    setSignupDraft({ code });
    router.push("/auth/location");
  };

  return (
    <AuthFrame title="Verify your phone">
      <BackButton />
      <section className="relative flex flex-1 flex-col px-6 pt-12">
        <h1 className="text-2xl font-semibold">Enter your 4-digit code</h1>
        <EditableField
          label="Code"
          value={code}
          onChange={(value) => setCode(value.replace(/\D/g, "").slice(0, 4))}
          type="text"
        />
        <button
          className="mt-auto pb-8 text-left text-sm font-medium text-[#53B878]"
          type="button"
        >
          Resend Code
        </button>
        <button
          className="absolute bottom-[174px] right-6 grid h-16 w-16 place-items-center rounded-full bg-[#53B878] text-3xl font-light text-white shadow-lg shadow-[#53B878]/30"
          type="button"
          onClick={handleNext}
          aria-label="Continue to location"
        >
          &rsaquo;
        </button>
        <NumberKeyboard
          onDigit={(digit) =>
            setCode((current) => `${current}${digit}`.slice(0, 4))
          }
          onDelete={() =>
            setCode((current) =>
              current.slice(0, Math.max(0, current.length - 1)),
            )
          }
        />
      </section>
    </AuthFrame>
  );
}

function MapIllustration() {
  return (
    <div className="relative mx-auto h-40 w-44">
      <div className="absolute bottom-3 left-4 h-24 w-36 rotate-[-8deg] rounded-[8px] bg-[#d8dde6]" />
      <div className="absolute bottom-9 left-6 h-4 w-32 rotate-[-8deg] bg-[#f6d35f]" />
      <div className="absolute bottom-7 left-9 h-20 w-10 rotate-[36deg] bg-[#58B87A]" />
      <div className="absolute bottom-8 right-7 h-20 w-7 rotate-[-48deg] bg-[#ffffff]" />
      <div className="absolute left-[59px] top-0 grid h-20 w-20 place-items-center rounded-full bg-[#6179F5]">
        <span className="h-6 w-6 rounded-full bg-white" />
      </div>
      <div className="absolute left-[83px] top-[58px] h-10 w-8 rotate-45 bg-[#6179F5]" />
    </div>
  );
}

export function LocationScreen() {
  const router = useRouter();
  const setLocation = useUserStore((state) => state.setLocation);
  const [zone, setZone] = useState("Banasree");
  const [area, setArea] = useState("Rampura");

  const handleSubmit = () => {
    setLocation(`${area}, ${zone}`);
    router.push("/auth/login");
  };

  return (
    <AuthFrame title="Choose delivery location">
      <BackButton />
      <section className="flex flex-1 flex-col px-6 pt-5">
        <MapIllustration />
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-semibold">Select Your Location</h1>
          <p className="mx-auto mt-3 max-w-[270px] text-sm leading-5 text-[#777b82]">
            Switch on your location to stay in tune with what&apos;s happening in
            your area
          </p>
        </div>

        <div className="mt-16 space-y-8">
          <EditableField label="Your Zone" value={zone} onChange={setZone} />
          <EditableField
            label="Your Area"
            value={area}
            onChange={setArea}
          />
        </div>

        <button
          className="mt-10 h-16 rounded-[16px] bg-[#53B878] text-sm font-semibold text-white"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>
    </AuthFrame>
  );
}

export function LoginScreen() {
  const router = useRouter();
  const dummyEmail = useUserStore((state) => state.dummyEmail);
  const dummyPassword = useUserStore((state) => state.dummyPassword);
  const completeAuth = useUserStore((state) => state.completeAuth);
  const [email, setEmail] = useState(dummyEmail);
  const [password, setPassword] = useState(dummyPassword);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const canLogin = completeAuth(email, password);

    if (!canLogin) {
      setError("Use the dummy email and password to continue.");
      return;
    }

    setError("");
    router.replace("/main/home");
  };

  return (
    <AuthFrame title="Login to continue">
      <section className="flex flex-1 flex-col px-6 pt-16">
        <CarrotLogo />
        <div className="mt-20">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="mt-3 text-sm text-[#777b82]">
            Enter your email and password
          </p>
        </div>

        <div className="mt-8 space-y-7">
          <EditableField
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <EditableField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            trailing={<span>hide</span>}
          />
        </div>

        {error ? (
          <p className="mt-4 rounded-[8px] bg-[#fff0ec] px-3 py-2 text-xs font-semibold text-[#b53b25]">
            {error}
          </p>
        ) : (
          <p className="mt-4 text-xs font-semibold text-[#777b82]">
            Dummy login: {dummyEmail} / {dummyPassword}
          </p>
        )}

        <button
          className="mt-3 self-end text-xs font-medium text-[#111827]"
          type="button"
        >
          Forgot Password?
        </button>
        <button
          className="mt-7 h-16 rounded-[16px] bg-[#53B878] text-sm font-semibold text-white"
          type="button"
          onClick={handleLogin}
        >
          Log In
        </button>
        <p className="mt-6 text-center text-xs font-semibold">
          Don&apos;t have an account?{" "}
          <Link className="text-[#53B878]" href="/auth/signup">
            Signup
          </Link>
        </p>
      </section>
    </AuthFrame>
  );
}

export function SignupScreen() {
  const dummyEmail = useUserStore((state) => state.dummyEmail);
  const router = useRouter();
  const signupDraft = useUserStore((state) => state.signupDraft);
  const setSignupDraft = useUserStore((state) => state.setSignupDraft);
  const [name, setName] = useState(signupDraft.name);
  const [email, setEmail] = useState(signupDraft.email || dummyEmail);
  const [password, setPassword] = useState(signupDraft.password);

  const handleSignup = () => {
    setSignupDraft({ name, email, password });
    router.push("/auth/number");
  };

  return (
    <AuthFrame title="Create your account">
      <section className="flex flex-1 flex-col px-6 pt-16">
        <CarrotLogo />
        <div className="mt-20">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <p className="mt-3 text-sm text-[#777b82]">
            Enter your credentials to continue
          </p>
        </div>

        <div className="mt-8 space-y-7">
          <EditableField label="Username" value={name} onChange={setName} />
          <EditableField
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            trailing={<span className="text-[#53B878]">ok</span>}
          />
          <EditableField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            trailing={<span>hide</span>}
          />
        </div>

        <p className="mt-5 max-w-[330px] text-xs leading-5 text-[#777b82]">
          By continuing you agree to our{" "}
          <span className="text-[#53B878]">Terms of Service</span> and{" "}
          <span className="text-[#53B878]">Privacy Policy</span>.
        </p>

        <button
          className="mt-7 h-16 rounded-[16px] bg-[#53B878] text-sm font-semibold text-white"
          type="button"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="mt-6 text-center text-xs font-semibold">
          Already have an account?{" "}
          <Link className="text-[#53B878]" href="/auth/login">
            Login
          </Link>
        </p>
      </section>
    </AuthFrame>
  );
}

export function OnboardingScreen() {
  return (
    <AuthFrame title="Welcome to Ahoum">
      <section className="relative flex flex-1 flex-col justify-end overflow-hidden bg-[#243729] px-6 pb-16 text-white">
  
        <div className="relative text-center">
          
          <CarrotLogo light={false} />
          <h1 className="mt-4 text-3xl font-black leading-tight">
            Welcome to our store
          </h1>
          <p className="mt-3 text-sm text-white/80">
            Get your groceries in as fast as one hour
          </p>
          <Link
            className="mt-8 grid h-14 w-full place-items-center rounded-[16px] bg-[#53B878] text-sm font-semibold text-white"
            href="/auth/signup"
          >
            Get Started
          </Link>
          </div>
       
      </section>
    </AuthFrame>
  );
}
