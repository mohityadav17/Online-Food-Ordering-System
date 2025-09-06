import React from 'react';
import { Plus, Leaf, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: () => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
              <div className="flex items-center space-x-2 mb-2">
                {item.isVegetarian && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Leaf className="w-3 h-3" />
                    <span className="text-xs">Veg</span>
                  </div>
                )}
                {item.isSpicy && (
                  <div className="flex items-center space-x-1 text-red-500">
                    <Flame className="w-3 h-3" />
                    <span className="text-xs">Spicy</span>
                  </div>
                )}
                {item.isPopular && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                    Popular
                  </span>
                )}
              </div>
            </div>
            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
          
          <button
            onClick={onAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        
        <div className="w-24 h-24 m-4">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}