import { Card, CardContent, CardFooter } from "./ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-secondary/20">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <p className="text-sm text-foreground/60 mb-1">{category}</p>
          <h3 className="font-medium mb-2">{name}</h3>
          <p className="font-display">${price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;