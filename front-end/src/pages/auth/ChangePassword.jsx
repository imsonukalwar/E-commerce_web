// import { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ChangePassword = () => {

//  const { email } = useParams();

//  const [newpassword,setNewPassword] = useState("");
//  const [conformpassword,setConfirmPassword] = useState("");

//  const navigate = useNavigate();

//  const handleChange = async(e)=>{
//   e.preventDefault();

//   try {
//    const res = await axios.post(
//     `http://localhost:8000/changePassword/${email}`,
//     { newpassword, conformpassword }
//    );

//    alert(res.data.message);
//    navigate("/login");

//   } catch (error) {
//    alert(error.response?.data?.message || "Error");
//   }
//  };

//  return (
//   <form onSubmit={handleChange}>
//    <h2>Change Password</h2>

//    <input
//     type="password"
//     placeholder="New Password"
//     value={newpassword}
//     onChange={(e)=>setNewPassword(e.target.value)}
//     required
//    />

//    <input
//     type="password"
//     placeholder="Confirm Password"
//     value={conformpassword}
//     onChange={(e)=>setConfirmPassword(e.target.value)}
//     required
//    />

//    <button type="submit">Change Password</button>
//   </form>
//  );
// };

// export default ChangePassword;





// import { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Lock } from "lucide-react";

// const ChangePassword = () => {

//   const { email } = useParams();

//   const [newpassword, setNewPassword] = useState("");
//   const [conformpassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `http://localhost:8000/changePassword/${email}`,
//         { newpassword, conformpassword }
//       );

//       alert(res.data.message);
//       navigate("/login");

//     } catch (error) {
//       alert(error.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">

//       {/* Card */}
//       <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-8 animate-fade-in">

//         {/* Icon */}
//         <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//           <Lock className="text-white" size={30} />
//         </div>

//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//           Change Password
//         </h2>

//         <p className="text-center text-gray-500 mb-6">
//           Enter your new password below
//         </p>

//         <form onSubmit={handleChange} className="space-y-4">

//           <input
//             type="password"
//             placeholder="New Password"
//             value={newpassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={conformpassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition duration-300 shadow-md"
//           >
//             {loading ? "Updating..." : "Change Password"}
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// };

import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {

  const { email } = useParams();

  const [newpassword, setNewPassword] = useState("");
  const [conformpassword, setConfirmPassword] = useState("");

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:8000/changePassword/${email}`,
        { newpassword, conformpassword }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">

      <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-8 animate-fade-in">

        {/* Messages */}
        {message && (
          <p className="text-green-600 text-center text-sm font-medium mb-2">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center text-sm font-medium mb-2">
            {error}
          </p>
        )}

        {/* Icon */}
        <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Lock className="text-white" size={30} />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Change Password
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleChange} className="space-y-4">

          {/* New Password */}
          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
              required
            />

            <span
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              value={conformpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
              required
            />

            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition duration-300 shadow-md"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
};








export default ChangePassword;
