import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const { host } = useContext(NoteContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("auth-token", json.authToken);
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left panel — Branding ───────────────────────────────────── */}
      <div className="w-full lg:w-[52%] flex items-center justify-center relative overflow-hidden
                      bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-950
                      min-h-[45vh] lg:min-h-screen">

        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-lg px-8 py-12 text-center text-white">

          {/* App icon with glow ring */}
          <div className="relative w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl" />
            <div className="relative w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/25
                            flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477
                     5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0
                     3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* App name */}
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight">iNotebook</h1>
          <p className="text-primary-200 text-sm uppercase tracking-[0.2em] mb-8 font-medium">
            Begin Your Journey
          </p>

          {/* Poem stanza */}
          <div className="my-8 mx-auto max-w-sm">
            <div className="relative px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/15">
              <span className="absolute -top-4 left-5 text-6xl leading-none text-primary-300/60 font-serif select-none">"</span>
              <p className="text-lg lg:text-xl font-light italic leading-relaxed text-white/90"
                 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                A page not yet written holds a thought already alive,
              </p>
              <p className="text-lg lg:text-xl font-light italic leading-relaxed text-white/90 mt-1"
                 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                the pen that finds the notebook finds what memories strive.
              </p>
              <span className="absolute -bottom-5 right-5 text-6xl leading-none text-primary-300/60 font-serif select-none">"</span>
            </div>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Secure & Private" },
              { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", label: "Organized Notes" },
              { icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", label: "Access Anywhere" },
            ].map(({ icon, label }) => (
              <div key={label}
                   className="flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-white/10 border border-white/15 text-primary-100 text-sm backdrop-blur-sm">
                <svg className="w-4 h-4 text-primary-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — Form ──────────────────────────────────────── */}
      <div className="w-full lg:w-[48%] flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white flex-1">
        <div className="w-full max-w-md">

          {/* Form heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">Create your account</h2>
            <p className="text-surface-500 mt-1.5 text-sm sm:text-base">Start organising your thoughts for free</p>
          </div>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">

                {/* Name */}
                <div>
                  <label htmlFor="name" className="label">Full Name</label>
                  <div className="relative">
                    <Field
                      type="text" id="name" name="name"
                      placeholder="Your full name"
                      autoComplete="name"
                      className="input input-with-icon"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg className="w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="name" component="div" className="mt-1.5 text-sm text-red-500" />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <div className="relative">
                    <Field
                      type="email" id="email" name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="input input-with-icon"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg className="w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="email" component="div" className="mt-1.5 text-sm text-red-500" />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="label">Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password" name="password"
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className="input input-with-icons"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg className="w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-surface-400 hover:text-surface-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="mt-1.5 text-sm text-red-500" />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary btn-block mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account…
                    </span>
                  ) : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-surface-200" />
            <span className="text-xs text-surface-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-surface-200" />
          </div>

          {/* Sign in link */}
          <p className="text-center text-surface-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link font-semibold">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;