import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import {ResponsiveContainer,AreaChart, XAxis,YAxis, Tooltip,Area} from "recharts"


const AdminSales = () => {

  const [stats, setStates] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
  });

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/orders/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        setStates(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (

    <div
      className="
        px-4 sm:px-8 py-12
        min-h-screen
        bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
      "
    >

      {/* ================= STATS ================= */}
      <div
        className="
          grid gap-6
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        "
      >

        {/* USERS */}
        <Card
          className="
            bg-gradient-to-br from-pink-600 to-purple-600
            text-white rounded-2xl
            shadow-xl hover:shadow-2xl
            hover:-translate-y-1
            transition-all
          "
        >
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-black">
            {stats.totalUsers}
          </CardContent>
        </Card>

        {/* PRODUCTS */}
        <Card
          className="
            bg-gradient-to-br from-indigo-600 to-purple-600
            text-white rounded-2xl
            shadow-xl hover:shadow-2xl
            hover:-translate-y-1
            transition-all
          "
        >
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-black">
            {stats.totalProducts}
          </CardContent>
        </Card>

        {/* ORDERS */}
        <Card
          className="
            bg-gradient-to-br from-green-600 to-emerald-500
            text-white rounded-2xl
            shadow-xl hover:shadow-2xl
            hover:-translate-y-1
            transition-all
          "
        >
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-black">
            {stats.totalOrders}
          </CardContent>
        </Card>

        {/* SALES */}
        <Card
          className="
            bg-gradient-to-br from-orange-500 to-pink-600
            text-white rounded-2xl
            shadow-xl hover:shadow-2xl
            hover:-translate-y-1
            transition-all
          "
        >
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-black">
            ₹{" "}
            {Number(stats.totalSales).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardContent>
        </Card>

      </div>

      {/* ================= CHART ================= */}
      <Card
        className="
          mt-10
          rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          bg-white/80 backdrop-blur-xl
        "
      >

        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Sales (Last 30 Days)
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[300px] sm:h-[350px]">

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.salesByDate || stats.sales}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#EC4899"
                fill="#EC4899"
              />
            </AreaChart>
          </ResponsiveContainer>

        </CardContent>

      </Card>

    </div>

  );

};



export default AdminSales;
