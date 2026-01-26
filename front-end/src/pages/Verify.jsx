// import React from 'react'

// const Verify = () => {
// return (
//     <div>
//     <div className='relative w-full h-[760px] overflow-hidden hover:shadow-blue-900 
// transition-shadow duration-300'>
//         <div className='min-h-screen flex items-center justify-center bg-pink-100 px-4'>
//             <div className='bg-white rounded-2xl shadow-1g w-full max-w-md text-center'>
//                 <h2 className='text-2xl font-semibold text-green-500 mb-4'> ✅ Check your email</h2>
//                 <p className='text-gray-600 text-sm'>
//                     We've send you an email to verify your account,please check your inbox and click the verification link</p>
//             </div>
//         </div>
//     </div>
//     </div>
// )
// }

// export default Verify


import React from "react";

const Verify = () => {
    return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
    
      {/* Card */}
        <div
        className="
        bg-white/80 backdrop-blur-xl
        rounded-3xl
        shadow-xl
        max-w-md w-full
        p-8
        text-center
        border border-white/40
        transition-all duration-500
        hover:shadow-2xl hover:scale-102
        "
    >
        {/* Animated Icon */}
        <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 animate-bounce">
            <span className="text-3xl">📧</span>
        </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-green-600 mb-3 animate-fade-in">
        Check your email
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
        We’ve sent you a verification link to your email address.  
        Please check your inbox and click the link to activate your account.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Hint */}
                <p className="text-xs text-gray-500 italic">
            Didn’t receive the email? Check your spam folder.
            </p>
        </div>
    </div>
    );
};

export default Verify;
