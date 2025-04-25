import { useEffect, useState } from "react";

interface Drop {
  id: number;
  username: string;
  skin: string;
  price: number;
  time: string;
}

const MOCK_DROPS: Drop[] = [
  { id: 1, username: "CyberWolf", skin: "AK-47 | Азимов", price: 12350, time: "Только что" },
  { id: 2, username: "HeadHunter", skin: "AWP | Драконий огонь", price: 25780, time: "2 мин назад" },
  { id: 3, username: "SniperElite", skin: "M4A4 | Император", price: 8940, time: "5 мин назад" },
  { id: 4, username: "Razor", skin: "Нож керамбит | Градиент", price: 45600, time: "7 мин назад" },
  { id: 5, username: "Phoenix", skin: "USP-S | Убийство", price: 3250, time: "10 мин назад" }
];

export default function LiveDrops() {
  const [drops, setDrops] = useState<Drop[]>(MOCK_DROPS);
  
  useEffect(() => {
    // Имитация получения новых дропов
    const interval = setInterval(() => {
      const newDrop = {
        id: Math.floor(Math.random() * 1000),
        username: ["Player" + Math.floor(Math.random() * 100), "Gamer" + Math.floor(Math.random() * 50), "Pro" + Math.floor(Math.random() * 25)][Math.floor(Math.random() * 3)],
        skin: ["AK-47 | Вулкан", "Desert Eagle | Пламя", "AWP | Медуза", "Glock-18 | Градиент", "M4A1-S | Кибербезопасность"][Math.floor(Math.random() * 5)],
        price: Math.floor(Math.random() * 20000) + 1000,
        time: "Только что"
      };
      
      // Обновить time для существующих дропов
      const updatedDrops = drops.map(drop => ({
        ...drop,
        time: drop.time === "Только что" ? "1 мин назад" : 
              drop.time === "1 мин назад" ? "2 мин назад" : 
              drop.time === "2 мин назад" ? "5 мин назад" : 
              drop.time === "5 мин назад" ? "7 мин назад" : 
              drop.time === "7 мин назад" ? "10 мин назад" : drop.time
      }));
      
      // Добавить новый дроп и удалить последний
      setDrops([newDrop, ...updatedDrops.slice(0, 4)]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [drops]);

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Последние дропы</h2>
        
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-4 grid grid-cols-12 gap-4 font-semibold text-muted-foreground border-b border-border">
            <div className="col-span-3">Игрок</div>
            <div className="col-span-5">Скин</div>
            <div className="col-span-2 text-right">Цена</div>
            <div className="col-span-2 text-right">Время</div>
          </div>
          
          <div className="divide-y divide-border">
            {drops.map(drop => (
              <div key={drop.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-muted/10 transition">
                <div className="col-span-3 font-medium truncate">{drop.username}</div>
                <div className="col-span-5 text-primary font-medium truncate">{drop.skin}</div>
                <div className="col-span-2 text-right font-bold">{drop.price.toLocaleString()} ₽</div>
                <div className="col-span-2 text-right text-muted-foreground">{drop.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
