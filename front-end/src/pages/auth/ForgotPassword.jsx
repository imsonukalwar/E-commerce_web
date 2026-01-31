// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {

//  const [email,setEmail] = useState("");
//  const navigate = useNavigate();

//  const handleSubmit = async(e)=>{
//   e.preventDefault();

//   try {
//    const res = await axios.post(
//     "http://localhost:8000/forgot-password",
//     { email }
//    );

//    alert(res.data.message);

//    navigate(`/verify-otp/${email}`);

//   } catch (error) {
//    alert(error.response?.data?.message || "Error");
//   }
//  };

//  return (
//   <form onSubmit={handleSubmit}>
//    <h2>Forgot Password</h2>

//    <input
//     type="email"
//     placeholder="Enter Email"
//     value={email}
//     onChange={(e)=>setEmail(e.target.value)}
//     required
//    />

//    <button type="submit">Send OTP</button>
//   </form>
//  );
// };

// export default ForgotPassword;





import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const ForgotPassword = () => {

const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
  const res = await axios.post(
    `${import.meta.env.VITE_URL}/forgot-password`,
    { email }
  );

  setMessage(res.data.message);
  setError("");

  setTimeout(() => {
    navigate(`/verify-otp/${email}`);
  }, 1500);

} catch (error) {
  setError(error.response?.data?.message || "Error");
  setMessage("");
}setLoading(false);
    }


return (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 40 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-indigo-100"
  >

    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-[380px] rounded-2xl shadow-2xl">

        <CardHeader className="text-center space-y-2">

          {/* ✅ MESSAGE HERE */}
          {message && (
            <p className="text-green-600 text-center text-sm font-medium">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center text-sm font-medium">
              {error}
            </p>
          )}

          <div className="mx-auto w-14 h-14 rounded-full bg-pink-600 flex items-center justify-center animate-bounce">
            <Mail className="text-white" />
          </div>

          <CardTitle className="text-2xl font-bold">
            Forgot Password
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Enter your email to receive OTP
          </p>

        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>

          </form>
        </CardContent>

      </Card>
    </motion.div>

  </motion.div>
);


};

export default ForgotPassword;

