import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Validate UUID format
  const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id || !isValidUUID.test(id)) {
        throw new Error("Invalid product ID");
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Product not found");
      return data;
    },
    retry: false,
    enabled: !!id,
  });

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0],
    });
    toast.success("Added to cart");
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-display mb-4">Product Not Found</h1>
            <Button onClick={() => navigate("/shop")}>
              Return to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="h-24 bg-gray-200 rounded mb-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-display mb-4">Product Not Found</h1>
            <Button onClick={() => navigate("/shop")}>
              Return to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-display mb-2">{product.name}</h1>
            <p className="text-2xl font-display mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={handleAddToCart} size="lg">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;