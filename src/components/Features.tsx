import { Shield, Zap, Award, Coins } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Честная игра",
    description: "Все наши игры и кейсы используют систему Provably Fair, гарантирующую честные результаты."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Мгновенные выводы",
    description: "Получайте выигранные скины на свой аккаунт в Steam мгновенно и без задержек."
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Эксклюзивные кейсы",
    description: "Уникальные кейсы с редкими скинами, которые вы не найдете на других сайтах."
  },
  {
    icon: <Coins className="h-10 w-10 text-primary" />,
    title: "Ежедневные бонусы",
    description: "Получайте бесплатные монеты каждый день для открытия кейсов без вложений."
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg border border-border">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
