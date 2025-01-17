import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ErrorFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
      <button
        className="mt-4 rounded bg-primary px-4 py-2 text-white"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </button>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow pt-16">
                  <AppRoutes />
                </div>
                <Footer />
              </div>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;