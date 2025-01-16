const Hero = () => {
  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-r from-primary/50 to-accent/50">
      {/* Decorative bubbles */}
      <div className="bubble w-32 h-32 top-1/4 left-1/4" style={{ animationDelay: "0s" }} />
      <div className="bubble w-24 h-24 top-1/3 right-1/4" style={{ animationDelay: "0.5s" }} />
      <div className="bubble w-16 h-16 bottom-1/4 left-1/3" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            Discover Your Natural Glow
          </h1>
          <p className="text-lg md:text-xl mb-8 text-foreground/80">
            Luxurious skincare essentials made with natural ingredients for a radiant, healthy complexion.
          </p>
          <a
            href="/shop"
            className="inline-block bg-foreground text-white px-8 py-3 rounded-full hover:bg-foreground/90 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;