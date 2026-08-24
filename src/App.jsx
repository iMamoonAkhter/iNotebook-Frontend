import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./components/Profile.jsx";
import ChangePassword from "./components/ChangePassword.jsx";

// Redirect authenticated users away from auth pages
const RedirectIfAuth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("auth-token");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Layout wrapper that conditionally shows Navbar/Footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const authRoutes = ["/login", "/signup", "/forgotpassword"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NoteState>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<RedirectIfAuth><Login /></RedirectIfAuth>} />
              <Route path="/signup" element={<RedirectIfAuth><Signup /></RedirectIfAuth>} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AppLayout>
        </Router>
      </NoteState>
    </>
  );
}

export default App;