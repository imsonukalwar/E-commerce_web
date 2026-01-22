import React from 'react'

const Verify = () => {
return (
    <div>
    <div className='relative w-full h-[760px] overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center bg-grya-300 px-4'>
            <div className='bg-white rounded-2xl shadow-1g w-full max-w-md text-center'>
                <h2 className='text-2xl font-semibold text-green-500 mb-4'> ✅ Check your email</h2>
                <p className='text-gray-400 text-sm'>
                    We've send you an email to verify your account,please check your inbox and click the verification link</p>
            </div>
        </div>
    </div>
    </div>
)
}

export default Verify
