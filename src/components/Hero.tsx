import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618022312529-237e7c10acac')] bg-cover bg-center opacity-15 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background"></div>
      
      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          CS:GO CASE BATTLE
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Открывай кейсы, участвуй в битвах и выигрывай крутые скины CS:GO
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="text-lg px-8">
            <Sparkles className="mr-2" /> Начать игру
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            О проекте
          </Button>
        </div>
      </div>
    </div>
  );
}
