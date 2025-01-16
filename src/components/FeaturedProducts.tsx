import ProductCard from "./ProductCard";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Jasmine Rice Toner",
    price: 28.00,
    category: "Toners",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Acne Patch",
    price: 16.00,
    category: "Treatments",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Anti-Aging Cream",
    price: 48.00,
    category: "Moisturizers",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
          Bestselling Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;