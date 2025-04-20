import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.6)' }}
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-browsing-through-clothes-in-a-clothing-store-3228/1080p.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Navigation */}
      <nav className="relative z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white text-2xl font-bold">
              StyleStore
            </Link>

            <div className="flex items-center space-x-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 pl-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
              </div>

              <button className="flex items-center text-white hover:text-gray-200 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                <span className="ml-2">Cart (0)</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Discover Your Style
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          Explore our curated collection of trendy and timeless pieces that define your unique style.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};
