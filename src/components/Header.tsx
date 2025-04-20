import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white text-3xl font-bold tracking-tight hover:text-white/90 transition-colors">
              Style<span className="text-blue-400">Store</span>
            </Link>

            <div className="flex items-center space-x-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2.5 pl-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/20 transition-all"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-white/60 group-focus-within:text-blue-400" />
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart (0)</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 -mt-16">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            Elevate Your <span className="text-blue-400">Style</span> Game
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of premium fashion pieces that blend timeless elegance with contemporary trends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
            >
              Shop Collection
            </Link>
            <Link
              to="/"
              className="px-8 py-3.5 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
