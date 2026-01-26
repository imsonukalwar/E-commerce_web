// import { Button } from './ui/button'

// const Hero = () => {
// return (
//     <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16'>\
//     <div className='max-w-7xl mx-auto px-4'>
//         <div className='grid md:grid-cols-2 gap-8 items-center'>
//             <div>
//                 <h1 className='text-4xl md:text-6xl font-bold mb-4'>latest Electronics at Best Prise</h1>
//                 <p className='text-4xl mb-6 text-blue-100'>Dsicover Cutting-Edge technology with 
//                     unbeatebals deals on smartphon and mobile ,laptop and more</p>
//                     <div className='flex flex-col sm:flex-row gap-4'>
//                         <Button variant='outline' className='border-white text-white hover:bg-white hover:text-blue-600
//                         bg-transparent'>Shoap Now</Button>
//                         <Button variant='outline' className='border-white text-white hover:bg-white hover:text-blue-600
//                         bg-transparent'>View Details</Button>
//                     </div>
//             </div>
//             <div className='relative '>
//                         <img src='hero.png' alt='' width={500} height={400} className='rounded-1g shadow-2xl'/>
//                     </div>
//         </div>
//     </div>
//     </section>
// )
// }

// export default Hero






import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Latest Electronics at <br /> Best Price
            </h1>

            <p className="text-lg md:text-xl mb-8 text-white/80">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="
                  border-white text-white bg-transparent
                  hover:bg-white hover:text-purple-600
                  transition-all duration-300
                  px-6 py-3 rounded-xl
                "
              >
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="
                  border-white text-white bg-transparent
                  hover:bg-white hover:text-purple-600
                  transition-all duration-300
                  px-6 py-3 rounded-xl
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
              width={500}
              height={400}
              className="
                rounded-xl shadow-2xl
                transition-transform duration-500
                hover:scale-105
              "
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

