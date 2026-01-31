import axios from "axios";
import React, { useEffect, useState } from "react";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  console.log("orders", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/orders/all",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("❌ Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-500 text-lg">
        Loading all orders...
      </div>
    );
  }

  return (
  <div
    className="
      px-4 md:px-8 py-10
      bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
      min-h-screen
    "
  >

    {/* TITLE */}
    <h1
      className="
        text-3xl md:text-4xl
        font-black mb-8
        bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
        bg-clip-text text-transparent
      "
    >
      Admin — All Orders
    </h1>

    {orders.length === 0 ? (
      <p className="text-gray-500 text-lg">
        No orders found.
      </p>
    ) : (
      <>
        {/* ================= DESKTOP TABLE ================= */}
        <div
          className="
            hidden md:block
            overflow-x-auto
            rounded-3xl
            shadow-xl
            border border-white/40
            bg-white/70 backdrop-blur-xl
          "
        >

          <table className="w-full text-sm">

            <thead className="bg-white/60 sticky top-0 z-10">
              <tr className="text-gray-700 uppercase text-xs">

                <th className="px-6 py-4 border-b">Order ID</th>
                <th className="px-6 py-4 border-b">Customer</th>
                <th className="px-6 py-4 border-b">Products</th>
                <th className="px-6 py-4 border-b">Amount</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b">Date</th>

              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-purple-50/60 transition"
                >

                  <td className="px-6 py-4 border-b text-xs">
                    {order._id}
                  </td>

                  <td className="px-6 py-4 border-b">
                    <p className="font-semibold">{order.user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {order.user?.email}
                    </p>
                  </td>

                  <td className="px-6 py-4 border-b space-y-1">
                    {order.products.map((p, i) => (
                      <div key={i}>
                        {p.productName} × {p.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="px-6 py-4 border-b font-bold">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold
                        ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 border-b">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="grid md:hidden gap-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white/80 backdrop-blur
                rounded-2xl
                shadow-lg
                p-5
                space-y-3
              "
            >

              <p className="text-xs text-gray-500">
                Order ID: {order._id}
              </p>

              <div>
                <p className="font-semibold">
                  {order.user?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {order.user?.email}
                </p>
              </div>

              <div className="text-sm">
                {order.products.map((p, i) => (
                  <div key={i}>
                    {p.productName} × {p.quantity}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">

                <span className="font-bold">
                  ₹{order.amount.toLocaleString("en-IN")}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold
                    ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {order.status}
                </span>

              </div>

              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))}

        </div>
      </>
    )}

  </div>
);


}
;

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const accessToken = localStorage.getItem("accessToken");
//   console.log("orders", orders);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8000/orders/all",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           },
//         );
//         if (data.success) setOrders(data.orders);
//       } catch (error) {
//         console.error("❌ Failed to fetch admin orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [accessToken]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-40">
//         <span className="animate-pulse text-lg text-gray-500">
//           Loading all orders...
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="
//       pr-20 mx-auto px-8 py-14
//       bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
//       min-h-screen
//     ">

//       {/* TITLE */}
//       <h1 className="
//         text-4xl font-black mb-10
//         bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
//         bg-clip-text text-transparent
//         tracking-tight
//       ">
//         Admin — All Orders
//       </h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-lg">
//           No orders found.
//         </p>
//       ) : (

//         <div className="
//           overflow-x-auto
//           rounded-3xl
//           shadow-[0_25px_80px_rgba(0,0,0,0.15)]
//           border border-white/40
//           bg-white/70 backdrop-blur-xl
//         ">

//           <table className="w-full text-sm">

//             {/* HEADER */}
//             <thead className="
//               bg-white/60 backdrop-blur-md
//               sticky top-0 z-10
//             ">
//               <tr className="text-gray-700 uppercase text-xs tracking-wider">

//                 <th className="px-6 py-4 border-b">Order ID</th>
//                 <th className="px-6 py-4 border-b">Customer</th>
//                 <th className="px-6 py-4 border-b">Products</th>
//                 <th className="px-6 py-4 border-b">Amount</th>
//                 <th className="px-6 py-4 border-b">Status</th>
//                 <th className="px-6 py-4 border-b">Date</th>

//               </tr>
//             </thead>

//             {/* BODY */}
//             <tbody>

//               {orders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="
//                     group
//                     hover:bg-purple-50/60
//                     transition-all
//                   "
//                 >

//                   <td className="px-6 py-4 border-b text-xs text-gray-600">
//                     {order._id}
//                   </td>

//                   <td className="px-6 py-4 border-b">
//                     <p className="font-semibold text-gray-800">
//                       {order.user?.name}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {order.user?.email}
//                     </p>
//                   </td>

//                   <td className="px-6 py-4 border-b space-y-1">
//                     {order.products.map((p, idx) => (
//                       <div key={idx} className="text-gray-700">
//                         {p.productName} × {p.quantity}
//                       </div>
//                     ))}
//                   </td>

//                   <td className="px-6 py-4 border-b font-bold text-gray-900">
//                     ₹{order.amount.toLocaleString("en-IN")}
//                   </td>

//                   <td className="px-6 py-4 border-b">
//                     <span
//                       className={`px-4 py-1 rounded-full text-xs font-bold
//                         ${
//                           order.status === "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : order.status === "Pending"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-red-100 text-red-700"
//                         }
//                       `}
//                     >
//                       {order.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 border-b text-gray-600">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>
//       )}

//     </div>
//   );
// };


// return (
//   <div
//     className="
//       px-4 md:px-8 py-10
//       bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
//       min-h-screen
//     "
//   >

//     {/* TITLE */}
//     <h1
//       className="
//         text-3xl md:text-4xl
//         font-black mb-8
//         bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
//         bg-clip-text text-transparent
//       "
//     >
//       Admin — All Orders
//     </h1>

//     {orders.length === 0 ? (
//       <p className="text-gray-500 text-lg">
//         No orders found.
//       </p>
//     ) : (
//       <>
//         {/* ================= DESKTOP TABLE ================= */}
//         <div
//           className="
//             hidden md:block
//             overflow-x-auto
//             rounded-3xl
//             shadow-xl
//             border border-white/40
//             bg-white/70 backdrop-blur-xl
//           "
//         >

//           <table className="w-full text-sm">

//             <thead className="bg-white/60 sticky top-0 z-10">
//               <tr className="text-gray-700 uppercase text-xs">

//                 <th className="px-6 py-4 border-b">Order ID</th>
//                 <th className="px-6 py-4 border-b">Customer</th>
//                 <th className="px-6 py-4 border-b">Products</th>
//                 <th className="px-6 py-4 border-b">Amount</th>
//                 <th className="px-6 py-4 border-b">Status</th>
//                 <th className="px-6 py-4 border-b">Date</th>

//               </tr>
//             </thead>

//             <tbody>

//               {orders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-purple-50/60 transition"
//                 >

//                   <td className="px-6 py-4 border-b text-xs">
//                     {order._id}
//                   </td>

//                   <td className="px-6 py-4 border-b">
//                     <p className="font-semibold">{order.user?.name}</p>
//                     <p className="text-xs text-gray-500">
//                       {order.user?.email}
//                     </p>
//                   </td>

//                   <td className="px-6 py-4 border-b space-y-1">
//                     {order.products.map((p, i) => (
//                       <div key={i}>
//                         {p.productName} × {p.quantity}
//                       </div>
//                     ))}
//                   </td>

//                   <td className="px-6 py-4 border-b font-bold">
//                     ₹{order.amount.toLocaleString("en-IN")}
//                   </td>

//                   <td className="px-6 py-4 border-b">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold
//                         ${
//                           order.status === "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : order.status === "Pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-red-100 text-red-700"
//                         }
//                       `}
//                     >
//                       {order.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 border-b">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {/* ================= MOBILE CARDS ================= */}
//         <div className="grid md:hidden gap-6">

//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="
//                 bg-white/80 backdrop-blur
//                 rounded-2xl
//                 shadow-lg
//                 p-5
//                 space-y-3
//               "
//             >

//               <p className="text-xs text-gray-500">
//                 Order ID: {order._id}
//               </p>

//               <div>
//                 <p className="font-semibold">
//                   {order.user?.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {order.user?.email}
//                 </p>
//               </div>

//               <div className="text-sm">
//                 {order.products.map((p, i) => (
//                   <div key={i}>
//                     {p.productName} × {p.quantity}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-between items-center">

//                 <span className="font-bold">
//                   ₹{order.amount.toLocaleString("en-IN")}
//                 </span>

//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-bold
//                     ${
//                       order.status === "Paid"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }
//                   `}
//                 >
//                   {order.status}
//                 </span>

//               </div>

//               <p className="text-xs text-gray-500">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </p>

//             </div>
//           ))}

//         </div>
//       </>
//     )}

//   </div>
// );



export default AdminOrders;
