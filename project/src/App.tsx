import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import { restaurants, menuItems } from './data/mockData';
import { Restaurant, MenuItem, CartItem } from './types';

type View = 'restaurants' | 'menu';

function App() {
  const [currentView, setCurrentView] = useState<View>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMenuItems = selectedRestaurant 
    ? menuItems.filter(item => item.restaurantId === selectedRestaurant.id)
    : [];

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Update delivery fee to be in rupees
  const deliveryFee = 25;

  const handleRestaurantClick = (restaurant: Restaurant) => {
    if (!restaurant.isOpen) {
      showNotification('Sorry, this restaurant is currently closed');
      return;
    }
    setSelectedRestaurant(restaurant);
    setCurrentView('menu');
  };

  const handleBackToRestaurants = () => {
    setCurrentView('restaurants');
    setSelectedRestaurant(null);
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.menuItem.id === menuItem.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { menuItem, quantity: 1 }];
      }
    });
    showNotification(`${menuItem.name} added to cart!`);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.menuItem.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.menuItem.id !== itemId)
    );
  };

  const handleCheckout = () => {
    showNotification('Order placed successfully! Estimated delivery: 30-45 minutes');
    setCartItems([]);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}

      {currentView === 'restaurants' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Delicious food, delivered fast
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Order from your favorite restaurants and get fresh food delivered to your doorstep
            </p>
          </div>

          {/* Restaurants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            ))}
          </div>

          {filteredRestaurants.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No restaurants found for "{searchQuery}"
              </p>
            </div>
          )}
        </main>
      ) : (
        selectedRestaurant && (
          <RestaurantMenu
            restaurant={selectedRestaurant}
            menuItems={currentMenuItems}
            onBack={handleBackToRestaurants}
            onAddToCart={handleAddToCart}
          />
        )
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;