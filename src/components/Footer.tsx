import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-lg mb-4">GlowyBloom</h3>
            <p className="text-sm text-gray-600">
              Your destination for premium skincare products that help you achieve your best skin.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-900">All Products</Link>
              </li>
              <li>
                <Link to="/shop?category=cleansers" className="text-sm text-gray-600 hover:text-gray-900">Cleansers</Link>
              </li>
              <li>
                <Link to="/shop?category=toners" className="text-sm text-gray-600 hover:text-gray-900">Toners</Link>
              </li>
              <li>
                <Link to="/shop?category=moisturizers" className="text-sm text-gray-600 hover:text-gray-900">Moisturizers</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-gray-900">My Account</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-600 hover:text-gray-900">Cart</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} GlowyBloom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;