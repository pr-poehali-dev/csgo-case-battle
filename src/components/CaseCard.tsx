import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  name: string;
  price: number;
  image: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export default function CaseCard({ name, price, image, rarity = "common" }: CaseCardProps) {
  const rarityClasses = {
    common: "border-gray-500",
    rare: "border-blue-500 glow",
    epic: "border-purple-500 glow",
    legendary: "border-yellow-500 glow"
  };

  return (
    <div className={cn(
      "case-card bg-card rounded-lg border-2 overflow-hidden flex flex-col", 
      rarityClasses[rarity]
    )}>
      <div className="p-4 flex-1 flex flex-col items-center justify-center">
        <img src={image} alt={name} className="w-full h-40 object-contain" />
        <h3 className="mt-4 text-lg font-medium text-center">{name}</h3>
        <p className="text-secondary font-bold text-xl mt-1">{price} ₽</p>
      </div>
      <div className="p-4 bg-card border-t border-border">
        <Button className="w-full">Открыть кейс</Button>
      </div>
    </div>
  );
}
