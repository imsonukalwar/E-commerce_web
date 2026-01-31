// import { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const VerifyOtp = () => {

//  const { email } = useParams();
//  const [otp,setOtp] = useState("");
//  const navigate = useNavigate();

//  const handleVerify = async(e)=>{
//   e.preventDefault();

//   try {
//    const res = await axios.post(
//     `http://localhost:8000/verifyOtp/${email}`,
//     { otp }
//    );

//    alert(res.data.message);

//    navigate(`/change-password/${email}`);

//   } catch (error) {
//    alert(error.response?.data?.message || "Error");
//   }
//  };

//  return (
//   <form onSubmit={handleVerify}>
//    <h2>Verify OTP</h2>

//    <input
//     placeholder="Enter OTP"
//     value={otp}
//     onChange={(e)=>setOtp(e.target.value)}
//     required
//    />

//    <button type="submit">Verify</button>
//   </form>
//  );
// };

// export default VerifyOtp;




// import { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ShieldCheck } from "lucide-react";

// const VerifyOtp = () => {

//   const { email } = useParams();
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `http://localhost:8000/verifyOtp/${email}`,
//         { otp }
//       );

//       alert(res.data.message);
//       navigate(`/change-password/${email}`);

//     } catch (error) {
//       alert(error.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600">

//       <motion.div
//         initial={{ opacity: 0, scale: 0.8, y: 40 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Card className="w-[380px] rounded-2xl shadow-2xl">

//           <CardHeader className="text-center space-y-2">
//             <div className="mx-auto w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
//               <ShieldCheck className="text-white" />
//             </div>

//             <CardTitle className="text-2xl font-bold">
//               Verify OTP
//             </CardTitle>

//             <p className="text-sm text-muted-foreground">
//               Enter the OTP sent to your email
//             </p>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleVerify} className="space-y-4">

//               <Input
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-emerald-600 hover:bg-emerald-700"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </Button>

//             </form>
//           </CardContent>

//         </Card>
//       </motion.div>

//     </div>
//   );
// };



import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const VerifyOtp = () => {

  const { email } = useParams();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:8000/verifyOtp/${email}`,
        { otp }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600">

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-[380px] rounded-2xl shadow-2xl">

          <CardHeader className="text-center space-y-2">

            {message && (
              <p className="text-green-600 text-sm font-medium text-center">
                {message}
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
              <ShieldCheck className="text-white" />
            </div>

            <CardTitle className="text-2xl font-bold">
              Verify OTP
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Enter the OTP sent to your email
            </p>

          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">

              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

            </form>
          </CardContent>

        </Card>
      </motion.div>

    </div>
  );
};





export default VerifyOtp;
