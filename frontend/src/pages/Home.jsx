import { Link } from "react-router-dom";
import "../styles/Home.css";

function Navbar() {
  return (
    <nav className="relative z-50 flex w-[80%] mx-auto mt-6 px-8 py-4 rounded-2xl justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        AI Resume Analyzer
      </Link>

      <div className="flex gap-8 text-gray-600">
        <a href="#features" className="hover:text-black">
          Features
        </a>
        <a href="#how-it-works" className="hover:text-black">
          How it works
        </a>
        <a href="#about" className="hover:text-black">
          About
        </a>
      </div>

      <div className="flex gap-4 items-center text-gray-600">
        <Link to="/login" className="hover:text-black">
          Login
        </Link>
        <Link to="/signup" className="hover:text-black">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="home-page relative min-h-screen">
      <Navbar />
    </div>
  );
}
