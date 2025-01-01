import React from "react";
import roommateIllustration from "../assets/images/roommate-finder-home.jpg";
import icon1 from "../assets/images/home-icon-1.png"; 
import icon2 from "../assets/images/home-icon-2.png"; 
import icon3 from "../assets/images/home-icon-3.png"; 
import dec1 from "../assets/images/decorative-1.png"; 
import dec2 from "../assets/images/decorative-2.png"; 
const Home = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-[#367896] italic">
          Shared Vibes
        </div>
        <nav className="space-x-8 text-[#367896] font-medium">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/register" className="hover:underline">
            Find Roommate
          </a>
          <a
            href="/login"
            className="px-4 py-2 border-2 border-[#367896] text-[#367896] rounded-full hover:bg-[#367896] hover:text-white"
          >
            Log In
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="bg-white-50 p-0">
        {/* Illustration */}
        <div className="flex items-center space-x-8">
          <img
            src={roommateIllustration}
            alt="Roommate illustration"
            className="w-1/1"
          />
        </div>

        {/* How It Works Section */}
        <section
          className="mt-1 py-16 relative overflow-hidden"
          style={{
            background: "radial-gradient(circle, #E6FDFF, white)",
          }}
        >
  <img
  src={dec1}
  alt="Decorative Curve"
  className="absolute bottom-0 left-0 hidden lg:block lg:w-20 lg:h-40"
/>

  <img
    src={dec2}
    alt="Decorative Circle"
    className="absolute top-5 right-0 hidden lg:block lg:w-15 lg:h-20"
  />
          <h2 className="text-3xl font-bold text-center text-[#000000] mb-6">
            How It Works?
          </h2>
          <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
            "Discover your perfect roommate with our intuitive matching system.
            Find harmony in shared living spaces with Shared Vibes."
          </p>
          <div className="flex justify-center space-x-8">
            <div className="bg-white shadow-lg p-8 rounded-2xl text-center w-60">
              <div className="bg-[#CCE6FF] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <img
                  src={icon1}
                  alt="Matching Lifestyle"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="font-bold text-lg text-[#385F6F]">
                Matching Lifestyle
              </h3>
              <p className="text-gray-600 mt-2">
                Find someone who matches your vibe.
              </p>
            </div>
            <div className="bg-white shadow-lg p-8 rounded-2xl text-center w-60">
              <div className="bg-[#FFF5CC] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <img
                  src={icon2}
                  alt="Scan & Spam Free"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="font-bold text-lg text-[#A77A51]">
                Scan & Spam Free
              </h3>
              <p className="text-gray-600 mt-2">
                Safe, secure, and hassle-free.
              </p>
            </div>
            <div className="bg-white shadow-lg p-8 rounded-2xl text-center w-60">
              <div className="bg-[#FFE6CC] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <img
                  src={icon3}
                  alt="Save Time"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="font-bold text-lg text-[#51372A]">Save Time</h3>
              <p className="text-gray-600 mt-2">Efficient roommate searches.</p>
            </div>
          </div>
        </section>

        <footer className="bg-[#8AB6B9] py-6 text-center text-white mt-1">
          {/* <p>&copy; 2025 Shared Vibes. All rights reserved.</p> */}
        </footer>
      </main>
    </div>
  );
};

export default Home;
