import { Button } from "@/components/ui/button";
import { User, Coins, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-card border-b border-border py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-2xl text-primary flex items-center gap-2">
            <span className="text-secondary">CS</span>BATTLE
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition">
              Главная
            </Link>
            <Link to="/battles" className="text-foreground hover:text-primary transition">
              Битвы
            </Link>
            <Link to="/cases" className="text-foreground hover:text-primary transition">
              Кейсы
            </Link>
            <Link to="/upgrades" className="text-foreground hover:text-primary transition">
              Апгрейды
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            <Coins className="mr-2 h-4 w-4" />
            Пополнить
          </Button>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Войти
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
}
