import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase.auth.getUser();
      const { data: claims } = await supabase.auth.getSession();
      return claims?.session?.user.app_metadata?.role === 'admin';
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (isAdmin === false) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  const { data: orders } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            product:products (
              name
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  if (!isAdmin) return null;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-display mb-8">Admin Dashboard</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {orders?.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Order #{order.id.slice(0, 8)}</span>
                  <span className="text-gray-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>${item.price_at_time.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 pt-2 border-t">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${order.total_price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;