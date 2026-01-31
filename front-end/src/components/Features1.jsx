


import { Headphones, Shield, Truck } from "lucide-react";

const Features1 = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          {/* FEATURE 1 */}
          <div className="group flex items-center space-x-5 p-7 rounded-2xl 
          bg-white/80 backdrop-blur-md 
          shadow-lg hover:shadow-2xl 
          transition-all duration-300 hover:-translate-y-1">

            <div className="h-14 w-14 bg-indigo-100 rounded-2xl 
            flex items-center justify-center 
            group-hover:bg-indigo-600 transition">

              <Truck className="h-7 w-7 text-indigo-600 group-hover:text-white transition" />
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Free Shipping
              </h3>
              <p className="text-gray-500 text-sm">
                On orders over $50
              </p>
            </div>

          </div>

          {/* FEATURE 2 */}
          <div className="group flex items-center space-x-5 p-7 rounded-2xl 
          bg-white/80 backdrop-blur-md 
          shadow-lg hover:shadow-2xl 
          transition-all duration-300 hover:-translate-y-1">

            <div className="h-14 w-14 bg-purple-100 rounded-2xl 
            flex items-center justify-center 
            group-hover:bg-purple-600 transition">

              <Shield className="h-7 w-7 text-purple-600 group-hover:text-white transition" />
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Secure Payment
              </h3>
              <p className="text-gray-500 text-sm">
                100% secure transaction
              </p>
            </div>

          </div>

          {/* FEATURE 3 */}
          <div className="group flex items-center space-x-5 p-7 rounded-2xl 
          bg-white/80 backdrop-blur-md 
          shadow-lg hover:shadow-2xl 
          transition-all duration-300 hover:-translate-y-1">

            <div className="h-14 w-14 bg-pink-100 rounded-2xl 
            flex items-center justify-center 
            group-hover:bg-pink-600 transition">

              <Headphones className="h-7 w-7 text-pink-600 group-hover:text-white transition" />
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                24/7 Support
              </h3>
              <p className="text-gray-500 text-sm">
                Always here to help
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


export default Features1;
