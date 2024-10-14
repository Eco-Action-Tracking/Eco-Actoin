import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartOperations } from "@/hooks/useCart";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCartOperations();

  const handleAddToCart = () => {
    if (isInCart(product._id)) {
      Swal.fire({
        title: "Already in Cart!",
        text: `${product.name} is already in your cart.`,
        icon: "info",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      addToCart(product);
      Swal.fire({
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        icon: "success",
        confirmButtonText: "Continue Shopping",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48">
          <Image
            src={product.picture[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-indigo-600 font-bold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
