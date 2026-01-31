import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



const Breadcrums = ({ product }) => {
  return (
    <div className="mb-6">

      <Breadcrumb>

        <BreadcrumbList className="flex flex-wrap gap-1 text-sm">

          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="hover:text-pink-600 transition"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink
              href="/products"
              className="hover:text-pink-600 transition"
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-gray-700">
              {product?.productName}
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>

      </Breadcrumb>

    </div>
  );
};




export default Breadcrums;
