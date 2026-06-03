import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";

function Hero() {
  return (
    <section className=" w-[80%] mx-auto min-h-screen flex items-center justify-between">
      {/* left side */}
      <div className="w-1/2 flex justify-start text-left">
        <div className="max-w-xl">
          <p className="inline-block px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 font-medium">
            AI Resume Analyzer
          </p>
          <div className="t">
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Analyze, Improve and Optimize Your Resume with AI
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Get instant feedback on your resume, improve ATS compatibility,
              and identify areas that can strengthen your job applications.
            </p>
          </div>
          <div className="flex gap-6">
            <button className="bg-blue-600 rounded-xl p-3 text-white shadow-lg hover:bg-blue-700">
              Get Started
            </button>
            <button className="p-3 bg-gray-300 rounded-xl shadow-lg hover:bg-gray-400">
              learn More
            </button>
          </div>
        </div>
      </div>

      {/* right side*/}
      <div className="flex justify-center w-1/2">
        <div className="relative">
          {/* ATS Card*/}
          <div className="absolute -top-8 right-0 bg-white rounded-xl p-4 shadow-lg">
            {" "}
            ATS Friendly ✓
          </div>
          {/* Main card*/}
          <div className="bg-white rounded-xl p-4 shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Resume Score</h3>
            <p className="text-2xl font-bold mb-6">89/100</p>
            <h4 className="font-semibold mb-2">Skills Found</h4>
            <ul>
              <li>✓ React</li>
              <li>✓ Python</li>
              <li>✓ Machine Learning</li>
            </ul>
          </div>
          {/* Skills Card*/}
          <div className="absolute -bottom-6 right-10 bg-white rounded-xl p-4 shadow-lg">
            React ✓
          </div>
        </div>
      </div>
    </section>
  );
}

function Navbar({ showNavbar }) {
  return (
    <nav
      className={`top-6 fixed left-1/2 -translate-x-1/2 z-50 flex w-[80%] mx-auto mt-6 px-8 py-4 rounded-2xl justify-between items-center transition-all duration-300 ${showNavbar ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}`}
    >
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
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-page relative min-h-screen">
      <Navbar showNavbar={showNavbar} />
      <Hero />
    </div>
  );
}
