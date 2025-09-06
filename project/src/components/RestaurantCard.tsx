import React from 'react';
import { Star, Clock, Truck } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Closed</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{restaurant.cuisine}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Truck className="w-4 h-4" />
            <span>₹{restaurant.deliveryFee}</span>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          Min. order ₹{restaurant.minOrder}
        </div>
      </div>
    </div>
  );
}