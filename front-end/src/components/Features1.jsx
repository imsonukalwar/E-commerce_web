// import { Headphones, Shield, Truck } from 'lucide-react'
// import React from 'react'

// const Features1 = () => {
//   return (
//     <section className='py-12 bg-muted/50'>
//         <div className='max-w-7xl mx-auto px-4'>
//             <div className='grid md:grid-cols-3 gap-8'>
//                 <div className='flex items-centerspace-x-4'>
//                     <div className='h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center'>
//                         <Truck className='h-6 w-6 text-blue-600'/>
//                     </div>
//                     <div>
//                         <h3 className='font-semibold '>Free Shipping</h3>
//                 <p className='text-muted-foreground'>On Oders Over $50</p>
//                     </div>
//                 </div>
//                 <div className='flex items-center space-x-4'>
//                     <div className='h-12 w-12 bg-green-100 rounded-full flex items-center justify-center'>
//                         <Shield className='h-6 w-6 text-green-600'/>
//                     </div>
//                     <idv>
//                         <h3 className='font-semibold '>Secure payment</h3>
//                 <p className='text-muted-foreground'>100% secure transection</p>
//                     </idv>
//                 </div>
//                 <div className='flex items-center space-x-4'>
//                 <div className='h-12 w-12 bg-green-100 rounded-full flex items-center justify-center'>
//                     <Headphones className='h-6 w-6  text-purple-700'/>
//                     </div>
//                     <div>
//                         <h3 className='font-semibold '>27/7 Support</h3>
//                 <p className='text-muted-foreground'>Alway here to help</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// )
// }

// export default Features1












import { Headphones, Shield, Truck } from "lucide-react";

const Features1 = () => {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">

          {/* FEATURE 1 */}
          <div className="flex items-center space-x-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Free Shipping
              </h3>
              <p className="text-gray-500 text-sm">
                On orders over $50
              </p>
            </div>
          </div>

          {/* FEATURE 2 */}
          <div className="flex items-center space-x-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Secure Payment
              </h3>
              <p className="text-gray-500 text-sm">
                100% secure transaction
              </p>
            </div>
          </div>

          {/* FEATURE 3 */}
          <div className="flex items-center space-x-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Headphones className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
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
