"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartOperations } from "../../hooks/useCart";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } =
    useCartOperations();
  const [isMounted, setIsMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulating payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demonstration, we'll consider the payment successful if the card number ends with '1234'
    if (cardNumber.endsWith("1234")) {
      setPaymentStatus("success");
    } else {
      setPaymentStatus("error");
    }

    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:space-x-8">
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex gap-2 items-end">
                  <Image
                    src={item.picture[0]}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="md:w-1/3 mt-8 md:mt-0">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <p className="text-lg font-semibold mb-4">
            Total: ${getCartTotal().toFixed(2)}
          </p>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            {paymentMethod === "credit_card" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="mb-4 flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CreditCard className="mr-2" />
                  Pay Now
                </>
              )}
            </button>
          </form>
          {paymentStatus && (
            <Alert
              className="mt-4"
              variant={paymentStatus === "success" ? "default" : "destructive"}
            >
              <AlertTitle>
                {paymentStatus === "success"
                  ? "Payment Successful"
                  : "Payment Failed"}
              </AlertTitle>
              <AlertDescription>
                {paymentStatus === "success"
                  ? "Your payment has been processed successfully."
                  : "There was an error processing your payment. Please try again."}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
