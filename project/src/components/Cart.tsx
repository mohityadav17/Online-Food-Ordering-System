import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    onCheckout();
    setShowCheckout(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              {showCheckout ? 'Checkout' : 'Your Cart'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!showCheckout ? (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart className="w-12 h-12 mb-4" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.menuItem.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.menuItem.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.menuItem.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-medium">
                            ₹{(item.menuItem.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              {items.length > 0 && (
                <div className="border-t p-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{Math.round(tax)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{Math.round(total)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Checkout Form */
            <div className="flex-1 p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={3}
                    placeholder="Enter your delivery address..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={2}
                    placeholder="Any special requests..."
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{Math.round(tax)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total</span>
                      <span>₹{Math.round(total)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Place Order - ₹{Math.round(total)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}