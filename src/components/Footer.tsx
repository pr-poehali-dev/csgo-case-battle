import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">
              <span className="text-secondary">CS</span>
              <span className="text-primary">BATTLE</span>
            </h3>
            <p className="text-muted-foreground">
              Лучший сайт для открытия кейсов CS:GO и участия в кейс-битвах.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition">Главная</Link></li>
              <li><Link to="/battles" className="text-muted-foreground hover:text-primary transition">Битвы</Link></li>
              <li><Link to="/cases" className="text-muted-foreground hover:text-primary transition">Кейсы</Link></li>
              <li><Link to="/upgrades" className="text-muted-foreground hover:text-primary transition">Апгрейды</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition">FAQ</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition">Условия использования</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition">Политика конфиденциальности</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-primary transition">Поддержка</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: support@csbattle.com</li>
              <li className="text-muted-foreground">Telegram: @csbattle_support</li>
              <li className="text-muted-foreground">Discord: CSBattle</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-muted-foreground">
          <p>© 2023 CSBattle. Все права защищены.</p>
          <p className="mt-2 text-sm">Этот сайт не аффилирован с Valve Corporation. Все игровые материалы принадлежат их владельцам.</p>
        </div>
      </div>
    </footer>
  );
}
