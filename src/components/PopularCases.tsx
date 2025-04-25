import CaseCard from "./CaseCard";

const CASES = [
  {
    id: 1,
    name: "Прайм Кейс",
    price: 299,
    image: "https://images.unsplash.com/photo-1608752503578-51eba66dbc4e",
    rarity: "common" as const
  },
  {
    id: 2,
    name: "Охотничий Кейс",
    price: 599,
    image: "https://images.unsplash.com/photo-1614446809739-eec6a96ec90e",
    rarity: "rare" as const
  },
  {
    id: 3,
    name: "Кейс Хрома",
    price: 999,
    image: "https://images.unsplash.com/photo-1608752503639-67affad2a957",
    rarity: "epic" as const
  },
  {
    id: 4,
    name: "Драконий Кейс",
    price: 1999,
    image: "https://images.unsplash.com/photo-1599780189766-5b472681a7f7",
    rarity: "legendary" as const
  }
];

export default function PopularCases() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Популярные кейсы</h2>
          <a href="/cases" className="text-primary hover:underline">
            Все кейсы
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASES.map((caseItem) => (
            <CaseCard 
              key={caseItem.id}
              name={caseItem.name}
              price={caseItem.price}
              image={caseItem.image}
              rarity={caseItem.rarity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
