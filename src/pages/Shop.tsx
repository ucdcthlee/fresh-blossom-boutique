import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (category) {
        query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-display mb-8">
          {category ? `${category}` : "All Products"}
        </h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-[300px] bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;