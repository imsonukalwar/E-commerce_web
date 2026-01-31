

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";



const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white py-20 sm:py-24">

      {/* BACKGROUND BLURS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-6">
              Latest Electronics at <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Best Price
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-white/80">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <Button
                onClick={() => navigate("/products")}
                variant="outline"
                className="
                  border-white text-white bg-white/10 backdrop-blur-md
                  hover:bg-white hover:text-purple-700
                  transition-all duration-300
                  px-8 py-3 rounded-2xl
                  hover:scale-105 shadow-lg
                "
              >
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="
                  border-white text-white bg-white/10 backdrop-blur-md
                  hover:bg-white hover:text-purple-700
                  transition-all duration-300
                  px-8 py-3 rounded-2xl
                  hover:scale-105 shadow-lg
                "
              >
                View Details
              </Button>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">

            <img
              src="banner1.png"
              alt="hero"
              className="
                w-[260px]
                sm:w-[340px]
                md:w-[450px]
                rounded-2xl shadow-2xl
                transition-transform duration-700
                hover:scale-110
              "
            />

          </div>

        </div>
      </div>
    </section>
  );
};




export default Hero;

