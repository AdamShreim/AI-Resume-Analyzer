import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";

function Footer() {
  return (
    <footer className="w-full min-h-fit bg-white border-t border-gray-300 mt-20">
      <div className="mx-auto py-12 w-[80%] flex gap-20">
        <div className="lg:w-[50%] mx-auto">
          <h3 className="text-xl font-bold">AI Resume Analyzer</h3>
          <p className="text-gray-600 mt-4 max-w-md">
            Improve your resume through AI-powered analysis, ATS optimization,
            and personalized recommendations.
          </p>
        </div>

        <div className="lg:w-[50%] flex flex-col gap-3">
          <a
            href="#features"
            className="block mt-2 text-gray-600 hover:text-blue-500"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block mt-2 text-gray-600 hover:text-blue-500"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="block mt-2 text-gray-600 hover:text-blue-500"
          >
            About
          </a>
        </div>
      </div>
      <div className="h-px bg-gray-300"></div>
      <p className="text-center text-gray-500 text-sm">
        © 2026 AI Resume Analyzer. All rights reserved.
      </p>
    </footer>
  );
}

function About() {
  return (
    <section id="about" className="w-[80%] mx-auto min-h-fit lg:py-24">
      <div>
        <h2 className="text-4xl font-bold mb-16">About AI Resume Analyzer</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left side*/}
        <div className="lg:w-[60%]">
          <p className="text-gray-600 leading-relaxed mb-6">
            AI Resume Analyzer is designed to help job seekers create stronger
            resumes through intelligent AI-powered analysis, ATS optimization,
            and personalized feedback tailored to modern hiring practices.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our platform evaluates resume structure, keyword usage, formatting,
            and skill relevance to provide actionable recommendations that can
            improve application quality, increase visibility to recruiters, and
            enhance interview opportunities.
          </p>
        </div>

        {/* Right side*/}
        <div className="lg:w-[40%] flex justify-center ">
          <div className="bg-white rounded-xl p-8 shadow-xl w-95 transition-all duration-300 hover:-translate-y-2 text-center hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-6">What We Analyze</h3>
            <ul className="font-bold text-lg text-gray-600 space-y-4">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> ATS Compatibility
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Resume Structure
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Keyword Optimization
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Skill Analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Personalized Feedback
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="md:w-[90%] lg:w-[80%] w-[80%] mx-auto min-h-screen py-24"
    >
      <div className="mb-10 ">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>

        <p className="text-gray-600 text-lg max-w-2xl">
          Follow three simple steps to receive detailed AI-powered feedback and
          improve your resume for modern hiring systems.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-row gap-16">
        {" "}
        {/* scheme side*/}
        <div className="md:w-[40%] lg:w-[40%] lg:flex flex-col items-center justify-center md:mt-25 lg:mt-0 ">
          {/* steps cards*/}
          {/* TODO: make the content side animates after hovering above the respective step*/}
          <div className="bg-white rounded-4xl p-8 shadow-xl w-85 transition-all duration-300 hover:-translate-y-2 text-center hover:shadow-2xl mb-25">
            <p className="text-sm font-semibold text-black mb-2">Step 1</p>
            <p className="font-bold text-lg text-blue-400">Upload Resume</p>
          </div>

          {/* <div className="flex flex-col items-center h-25">
            <div className="w-0.5 h-15 bg-gray-700"></div>
            <div className="w-0.5 h-15 bg-gray-700"></div>
          </div> */}

          <div className="bg-white rounded-4xl p-8 shadow-xl w-85 transition-all duration-300 hover:-translate-y-2 text-center hover:shadow-2xl mb-25">
            <p className="text-sm font-semibold text-black mb-2">Step 2</p>
            <p className="font-bold text-lg text-blue-400">AI Analysis</p>
          </div>

          {/* <div className="flex flex-col items-center h-25">
            <div className="w-0.5 h-15 bg-gray-700"></div>
            <div className="w-0.5 h-15 bg-gray-700"></div>
          </div> */}

          <div className="bg-white rounded-4xl p-8 shadow-xl w-85 transition-all duration-300 hover:-translate-y-2 text-center hover:shadow-2xl">
            <p className="text-sm font-semibold text-black mb-2">Step 3</p>
            <p className="font-bold text-lg text-blue-400">Recommendations</p>
          </div>
        </div>
        {/* content side*/}
        <div className=" lg:w-[60%] items-center justify-center ">
          <div className=" lg:w-[60%] lg:ml-[20%] mt-12">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Step 1</h1>
            <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>
            <p className="text-gray-600 leading-relaxed">
              Upload your resume in PDF or DOCX format. Our system securely
              processes the document and prepares it for a comprehensive
              AI-powered evaluation.
            </p>
            <div className="h-0.5 bg-gray-700 w-full mt-5"></div>
          </div>

          <div className="lg:w-[60%] lg:ml-[20%] mt-8">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Step 2</h1>
            <h2 className="text-xl font-bold mb-4">AI Analysis</h2>
            <p className="text-gray-600 leading-relaxed">
              The AI analyzes ATS compatibility, keyword optimization, resume
              structure, formatting, and skill relevance to identify strengths
              and improvement opportunities.
            </p>
            <div className="h-0.75 md:h-px lg:h-0.5  bg-gray-700 w-full mt-5"></div>
          </div>

          <div className="lg:w-[60%] lg:ml-[20%] mt-8 mb-12">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Step 3</h1>
            <h2 className="text-xl font-bold mb-4">Receive Recommendations</h2>
            <p className="text-gray-600 leading-relaxed">
              Receive a detailed report containing actionable insights,
              personalized recommendations, and optimization strategies designed
              to strengthen your applications and improve interview prospects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section id="features" className="w-[80%] mx-auto min-h-screen py-24">
      <div className="z-20 relative">
        <div className="mb-16">
          <p className="font-bold text-4xl">Why Choose AI Resume Analyzer?</p>
          <p className="text-lg mt-4 text-gray-700">
            Discover how AI can help you improve your resume and increase your
            chances of landing interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8">
          {/* first card*/}
          <div className="bg-white rounded-xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left hover:shadow-2xl">
            <p className="font-extrabold text-4xl mb-4 text-blue-400">01</p>
            <h2 className="text-xl font-bold mb-4">ATS Optimization</h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              Analyze your resume against Applicant Tracking Systems (ATS) used
              by employers. Identify formatting issues, missing keywords, and
              optimization opportunities to increase your chances of passing
              automated screenings.
            </p>
          </div>

          {/* second card*/}
          <div className="bg-white rounded-xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left hover:shadow-2xl  ">
            <p className="font-extrabold text-4xl mb-4 text-blue-400">02</p>
            <h2 className="text-xl font-bold mb-4">AI Feedback</h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              Receive intelligent feedback on your resume's structure, content,
              and presentation. Get actionable recommendations that help you
              create a stronger, more professional application.
            </p>
          </div>

          {/* third card*/}
          <div className="bg-white rounded-xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left hover:shadow-2xl  ">
            <p className="font-extrabold text-4xl mb-4 text-blue-400">03</p>
            <h2 className="text-xl font-bold mb-4">Skill Analysis</h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              Detect important skills and competencies found in your resume
              while identifying gaps that may impact your applications. Receive
              personalized suggestions to strengthen your profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section
      id="Hero"
      className=" w-[90%] lg:w-[80%] mx-auto lg:min-h-screen flex flex-col lg:flex-row md:flex-row items-center justify-between gap-16 py-24 z-1 relative"
    >
      {/* left side */}
      <div className="w-full lg:w-1/2 flex justify-start text-left">
        <div className="max-w-xl">
          {/* <div className="text-left">
            <p className="ml-8 px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 font-medium text-5xl">
              AI Resume Analyzer
            </p>
          </div> */}
          <div className="text-left">
            <h1 className="text-4xl lg:text-6xl md:text-5xl font-bold leading-tight mb-6 ml-8">
              Analyze, Improve and Optimize Your Resume with AI
            </h1>
            <p className="text-gray-600 text-lg mb-8 ml-8 text-left">
              Receive detailed AI-powered insights on your resume, improve ATS
              compatibility, identify missing skills and keywords, and discover
              practical recommendations to strengthen your job applications and
              increase your chances of securing interviews.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row gap-4 justify-center ml-8">
            <Link to="/resume-analysis">
              <button className="bg-blue-600 rounded-xl px-6 py-3 text-white shadow-lg hover:bg-blue-500 transition font-medium">
                Get Started
              </button>
            </Link>

            <a href="#about">
              <button className="px-6 py-3 bg-gray-100 font-medium rounded-xl shadow-lg hover:bg-gray-200 transition">
                learn More
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* right side*/}
      <div className="flex justify-center w-full lg:w-1/2 lg:pl-10">
        <div className="relative">
          {/* ATS Card*/}
          <div className="absolute -top-8 right-3 bg-gray-50 rounded-xl p-4 shadow-lg px-5 py-3 z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            {" "}
            ATS Friendly <span className="text-green-500">✓</span>
          </div>
          {/* Main card*/}
          <div className="bg-white rounded-xl p-8 shadow-2xl w-[18rem] lg:w-80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Resume Score</h3>
            <p className="text-2xl font-bold mb-1 text-blue-500">89</p>
            <p className="text-gray-500 mt-1 mb-6 text-xl">out of 100</p>
            <h4 className="font-semibold mb-2">Skills Found</h4>
            <ul>
              <li>
                <span className="text-green-500">✓</span> React
              </li>
              <li>
                <span className="text-green-500">✓</span> Python
              </li>
              <li>
                <span className="text-green-500">✓</span> Machine Learning
              </li>
            </ul>
          </div>
          {/* Skills Card*/}
          <div className="absolute -bottom-6 right-10 bg-gray-100 rounded-xl px-5 py-3 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            React <span className="text-green-500">✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Navbar({ showNavbar, scrolled, menuOpen, setMenuOpen }) {
  return (
    <nav
      className={`top-0 fixed left-1/2 -translate-x-1/2 z-50 flex w-[90%] lg:w-[80%] mx-auto mt-6 px-8 py-4 rounded-2xl justify-between items-center transition-all duration-300 ${showNavbar ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${scrolled ? "bg-white shadow-lg backdrop-blur-lg" : "bg-transparent"}`}
    >
      {/* Hamburger menu */}
      <div
        className={`lg:hidden absolute top-15 left-[86%] md:left-[94%] -translate-x-1/2 w-[30%] md:w-[20%] bg-white shadow-lg rounded-xl p-2 md:p-4 flex flex-col gap-4 transition-all duration-300 z-50
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <a
          href="#features"
          className="hover:text-black text-gray-500 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="hover:text-black text-gray-500 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          How it works
        </a>
        <a
          href="#about"
          className="hover:text-black text-gray-500 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>

        <Link
          to="/login"
          className="hover:text-black text-gray-500 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:text-black text-gray-500 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up
        </Link>
      </div>
      <a href="/" className="text-xl font-bold scroll-smooth">
        AI Resume Analyzer
      </a>

      <div className="hidden lg:flex gap-8 text-gray-600">
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

      <div className="hidden lg:flex gap-4 items-center text-gray-600">
        <Link to="/login" className="hover:text-black">
          Login
        </Link>
        <Link to="/signup" className="hover:text-black">
          Sign Up
        </Link>
      </div>
      <button
        className="lg:hidden text-2xl transition-all duration-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bg-gray-100 rounded-[50%] w-10 h-10 flex items-center justify-center">
          {menuOpen ? "✕" : "☰"}
        </div>
      </button>
    </nav>
  );
}

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
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
      <Navbar
        showNavbar={showNavbar}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Hero />
      <Feature />
      <HowItWorks />
      <About />
      <Footer />
    </div>
  );
}
