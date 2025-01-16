import { ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { items } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-2xl">
            GlowyBloom
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-foreground/80 hover:text-foreground">Shop All</Link>
            <Link to="/shop?category=cleansers" className="text-foreground/80 hover:text-foreground">Cleansers</Link>
            <Link to="/shop?category=toners" className="text-foreground/80 hover:text-foreground">Toners</Link>
            <Link to="/shop?category=moisturizers" className="text-foreground/80 hover:text-foreground">Moisturizers</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-xs w-4 h-4 rounded-full flex items-center justify-center text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/shop" className="text-foreground/80 hover:text-foreground">Shop All</Link>
              <Link to="/shop?category=cleansers" className="text-foreground/80 hover:text-foreground">Cleansers</Link>
              <Link to="/shop?category=toners" className="text-foreground/80 hover:text-foreground">Toners</Link>
              <Link to="/shop?category=moisturizers" className="text-foreground/80 hover:text-foreground">Moisturizers</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;