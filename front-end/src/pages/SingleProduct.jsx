import Breadcrums from "@/components/Breadcrums";
import ProductDesc from "@/components/ProductDesc";
import Productimage from "@/components/Productimage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const params = useParams();
  const productId = params.id;

  const { products } = useSelector((store) => store.product);
  const product = products?.find((item) => item?._id === productId);

  return (
    <div
      className="
        min-h-screen
        pt-24 pb-12
        bg-gradient-to-br
        from-slate-100 via-pink-100 to-purple-100
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* BREADCRUMBS */}
        <Breadcrums product={product} />

        {/* CONTENT */}
        <div
          className="
            mt-10
            grid grid-cols-1
            md:grid-cols-2
            gap-10 md:gap-14
            items-start
          "
        >
          {/* LEFT IMAGE GALLERY */}
          <div
            className="
              bg-white/80 backdrop-blur-xl
              p-4 sm:p-6
              rounded-3xl
              shadow-xl
            "
          >
            <Productimage images={product?.productImage} />
          </div>

          {/* RIGHT DESC */}
          <ProductDesc product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
