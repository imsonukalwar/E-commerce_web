import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-3 sm:px-6 lg:px-12 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          onClick={() => navigate(-1)}
          className="rounded-full p-2 bg-blue shadow hover:bg-green-500"
        >
          <ArrowLeft className='bg-blue-400'/>
        </Button>

        <h1 className="
          text-2xl sm:text-3xl font-extrabold
          bg-gradient-to-r from-purple-600 to-pink-600
          bg-clip-text text-transparent
        ">
          Orders
        </h1>
      </div>

      {/* Empty */}
      {userOrder?.length === 0 ? (
        <p className="text-gray-500 text-lg sm:text-xl text-center py-20">
          No Orders found for this user
        </p>
      ) : (

        <div className="space-y-8">

          {userOrder?.map((order) => (

            <div
              key={order._id}
              className="
                bg-white
                rounded-2xl
                border
                shadow-md
                hover:shadow-xl
                transition
                p-5 sm:p-6
              "
            >

              {/* ORDER TOP */}
              <div className="
                flex flex-col sm:flex-row
                sm:justify-between
                sm:items-center
                gap-2 mb-5
              ">

                <div>
                  <h2 className="font-semibold text-sm sm:text-base">
                    Order ID:
                    <span className="text-gray-500 ml-2 break-all">
                      {order._id}
                    </span>
                  </h2>

                  <p className="text-sm text-gray-600">
                    Amount:
                    <span className="font-bold text-gray-900 ml-1">
                      {order.currency} {order.amount.toFixed(2)}
                    </span>
                  </p>
                </div>

                <span
                  className={`
                    ${
                      order.status === "Paid"
                        ? "bg-green-500"
                        : order.status === "Failed"
                        ? "bg-red-500"
                        : "bg-orange-400"
                    }
                    text-white px-4 py-1
                    rounded-full text-sm font-medium
                    w-fit
                  `}
                >
                  {order.status}
                </span>

              </div>

              {/* USER INFO */}
              <div className="
                flex flex-col sm:flex-row
                sm:justify-between
                gap-2 mb-6
              ">

                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">User:</span>{" "}
                    {order.user?.firstName || "Unknown"}{" "}
                    {order.user?.lastName}
                  </p>

                  <p className="text-sm text-gray-500 break-all">
                    {order.user?.email}
                  </p>
                </div>

              </div>

              {/* PRODUCTS */}
              <div>

                <h3 className="font-semibold mb-4 text-gray-800">
                  Products
                </h3>

                <ul className="space-y-3">

                  {order.products.map((product, index) => (

                    <li
                      key={index}
                      className="
                        flex flex-col sm:flex-row
                        sm:items-center
                        gap-3
                        bg-gray-50
                        hover:bg-gray-100
                        p-3 rounded-xl
                        transition
                      "
                    >

                      <div className="flex items-center gap-3 flex-1">

                        <img
                          onClick={() =>
                            navigate(
                              `/product/${product?.productId?._id}`
                            )
                          }
                          src={
                            product?.productId?.productImage?.[0]
                              ?.url
                          }
                          className="
                            w-16 h-16
                            object-cover rounded-lg
                            cursor-pointer
                            hover:scale-105 transition
                          "
                          alt=""
                        />

                        <div>
                          <p className="
                            font-medium text-gray-700
                            max-w-[240px] sm:max-w-[300px]
                            line-clamp-1
                          ">
                            {product.productId?.productName}
                          </p>

                          <p className="text-xs text-gray-500 break-all">
                            {product?.productId?._id}
                          </p>
                        </div>

                      </div>

                      <p className="font-semibold text-gray-800">
                        ₹ {product.productId.productPrise} ×{" "}
                        {product.quantity}
                      </p>

                    </li>

                  ))}

                </ul>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};





export default OrderCard
