import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Truck } from 'lucide-react';
import { Restaurant, MenuItem, CartItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface RestaurantMenuProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function RestaurantMenu({ 
  restaurant, 
  menuItems, 
  onBack, 
  onAddToCart 
}: RestaurantMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to restaurants</span>
          </button>
          
          <div className="flex items-start space-x-4">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
              <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="w-4 h-4" />
                  <span>₹{restaurant.deliveryFee} delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={() => onAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}