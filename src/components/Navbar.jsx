import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/cartStore";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCartStore();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="sticky top-0 flex justify-between bg-[#FFCF50] h-auto">
      <h1
        className="text-3xl font-bold p-7 h-full cursor-pointer"
        onClick={handleLogoClick}
      >
        MobileStore
      </h1>
      <div className="relative p-7">
        <ShoppingCart size={32} />
        {cartCount > 0 && (
          <div
            data-testid="cart-count"
            className="absolute top-5 right-5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            {cartCount}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
