import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      if (!user) return null;
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
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-display mb-8">My Profile</h1>
        
        {profileLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Profile Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Username</p>
                <p>{profile?.username || "Not set"}</p>
              </div>
              <div>
                <p className="text-gray-600">Full Name</p>
                <p>{profile?.full_name || "Not set"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p>{profile?.phone || "Not set"}</p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-xl font-medium mb-4">Order History</h2>
        {ordersLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="h-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : orders?.length === 0 ? (
          <p className="text-gray-600">No orders yet</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Profile;