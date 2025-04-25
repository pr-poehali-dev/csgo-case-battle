import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, RefreshCw, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Skin {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: "common" | "uncommon" | "rare" | "mythical" | "legendary";
}

export default function Upgrades() {
  const [multiplier, setMultiplier] = useState(1.5);
  const [winChance, setWinChance] = useState(50);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [targetSkin, setTargetSkin] = useState<Skin | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<'pending' | 'win' | 'lose'>('pending');
  const [showResult, setShowResult] = useState(false);
  const [upgradeProgress, setUpgradeProgress] = useState(0);
  const [winThreshold, setWinThreshold] = useState(50);
  const [randomValue, setRandomValue] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);
  const resultTimeoutRef = useRef<number | null>(null);
  
  // Демо скины для выбора
  const userSkins: Skin[] = [
    { id: "1", name: "USP-S | Neo-Noir", image: "https://source.unsplash.com/random/128x128/?gun", price: 15.40, rarity: "rare" },
    { id: "2", name: "AK-47 | Redline", image: "https://source.unsplash.com/random/128x128/?rifle", price: 25.80, rarity: "uncommon" },
    { id: "3", name: "AWP | Asiimov", image: "https://source.unsplash.com/random/128x128/?sniper", price: 87.50, rarity: "mythical" },
    { id: "4", name: "Glock-18 | Fade", image: "https://source.unsplash.com/random/128x128/?pistol", price: 12.30, rarity: "uncommon" },
    { id: "5", name: "Butterfly Knife | Doppler", image: "https://source.unsplash.com/random/128x128/?knife", price: 320.00, rarity: "legendary" },
  ];

  // Демо скины для апгрейда
  const targetSkins: Skin[] = [
    { id: "t1", name: "Desert Eagle | Blaze", image: "https://source.unsplash.com/random/128x128/?desert", price: 54.30, rarity: "rare" },
    { id: "t2", name: "M4A4 | Howl", image: "https://source.unsplash.com/random/128x128/?wolf", price: 1200.00, rarity: "legendary" },
    { id: "t3", name: "Karambit | Fade", image: "https://source.unsplash.com/random/128x128/?blade", price: 860.50, rarity: "legendary" },
  ];

  const handleMultiplierChange = (value: number[]) => {
    const newMultiplier = value[0];
    setMultiplier(newMultiplier);
    // Расчет шанса на выигрыш обратно пропорционален множителю
    setWinChance(Math.round(67 / newMultiplier));
  };

  const selectTargetSkin = (skin: Skin) => {
    setTargetSkin(skin);
    // Корректируем множитель на основе цены целевого скина
    if (selectedSkin) {
      const newMultiplier = parseFloat((skin.price / selectedSkin.price).toFixed(2));
      setMultiplier(newMultiplier);
      setWinChance(Math.round(67 / newMultiplier));
    }
  };

  const startUpgrade = () => {
    if (!selectedSkin || !targetSkin) return;
    
    // Очищаем предыдущие таймеры, если они есть
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current);
    
    setIsUpgrading(true);
    setShowResult(false);
    setUpgradeProgress(0);
    setWinThreshold(winChance);
    
    // Генерация случайного числа от 0 до 100 для определения результата
    const random = Math.random() * 100;
    setRandomValue(random);
    
    // Анимация прогресса
    progressIntervalRef.current = window.setInterval(() => {
      setUpgradeProgress(prev => {
        if (prev >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    
    // Показать результат через 2 секунды
    resultTimeoutRef.current = window.setTimeout(() => {
      setIsUpgrading(false);
      setShowResult(true);
      setUpgradeResult(random < winChance ? 'win' : 'lose');
    }, 2000);
  };

  const resetUpgrade = () => {
    setShowResult(false);
    setUpgradeResult('pending');
    setUpgradeProgress(0);
  };

  const rarityColors = {
    common: "border-gray-400 bg-gray-400/10",
    uncommon: "border-blue-400 bg-blue-400/10",
    rare: "border-purple-400 bg-purple-400/10",
    mythical: "border-pink-400 bg-pink-400/10",
    legendary: "border-amber-400 bg-amber-400/10 shadow-glow-amber"
  };

  const rarityText = {
    common: "text-gray-400",
    uncommon: "text-blue-400",
    rare: "text-purple-400",
    mythical: "text-pink-400",
    legendary: "text-amber-400"
  };

  // Очистка интервалов при размонтировании
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Апгрейд скинов</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - выбор скина */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Выберите скин для апгрейда</h2>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full h-auto p-4 flex justify-between items-center">
                  {selectedSkin ? (
                    <div className="flex items-center gap-3">
                      <img src={selectedSkin.image} alt={selectedSkin.name} className="w-12 h-12 object-cover rounded" />
                      <div className="text-left">
                        <p className="font-medium">{selectedSkin.name}</p>
                        <p className="text-sm text-muted-foreground">${selectedSkin.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    <span>Выберите скин</span>
                  )}
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ваши скины</DialogTitle>
                  <DialogDescription>
                    Выберите скин, который хотите улучшить
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {userSkins.map((skin) => (
                    <button
                      key={skin.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${rarityColors[skin.rarity]} hover:bg-accent transition-colors`}
                      onClick={() => {
                        setSelectedSkin(skin);
                        setTargetSkin(null);
                        resetUpgrade();
                      }}
                    >
                      <img src={skin.image} alt={skin.name} className="w-12 h-12 object-cover rounded" />
                      <div className="text-left">
                        <p className={`font-medium ${rarityText[skin.rarity]}`}>{skin.name}</p>
                        <p className="text-sm text-muted-foreground">${skin.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            
            {selectedSkin && (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Настройка множителя</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">x1.1</span>
                        <span className="text-primary font-medium">x{multiplier.toFixed(2)}</span>
                        <span className="text-sm">x10</span>
                      </div>
                      <Slider
                        value={[multiplier]}
                        min={1.1}
                        max={10}
                        step={0.1}
                        onValueChange={handleMultiplierChange}
                        className="w-full"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-card/50 p-3 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground">Шанс выигрыша</p>
                          <p className="font-medium text-lg">{winChance}%</p>
                        </div>
                        <div className="bg-card/50 p-3 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground">Потенциальная стоимость</p>
                          <p className="font-medium text-lg">${(selectedSkin.price * multiplier).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Средняя колонка - контейнер апгрейда */}
          <div className="flex flex-col items-center justify-center">
            {selectedSkin && (
              <div className="relative w-full">
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className={`p-4 border rounded-lg ${rarityColors[selectedSkin.rarity]}`}>
                    <img src={selectedSkin.image} alt={selectedSkin.name} className="w-full h-32 object-contain mb-2" />
                    <p className={`text-sm font-medium ${rarityText[selectedSkin.rarity]}`}>{selectedSkin.name}</p>
                    <p className="text-muted-foreground">${selectedSkin.price.toFixed(2)}</p>
                  </div>
                  
                  {targetSkin ? (
                    <div className={`p-4 border rounded-lg ${rarityColors[targetSkin.rarity]}`}>
                      <img src={targetSkin.image} alt={targetSkin.name} className="w-full h-32 object-contain mb-2" />
                      <p className={`text-sm font-medium ${rarityText[targetSkin.rarity]}`}>{targetSkin.name}</p>
                      <p className="text-muted-foreground">${targetSkin.price.toFixed(2)}</p>
                    </div>
                  ) : (
                    <div className="p-4 border rounded-lg border-dashed border-border flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Выберите целевой скин</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {isUpgrading && (
              <div className="mt-8 w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>0%</span>
                  <span>Шанс: {winChance}%</span>
                  <span>100%</span>
                </div>
                <div className="relative w-full">
                  <Progress value={upgradeProgress} className="h-8" />
                  <div 
                    className="absolute top-0 h-8 w-px bg-red-500" 
                    style={{ left: `${winThreshold}%` }}
                  />
                  {upgradeProgress > 0 && (
                    <div 
                      className="absolute top-0 h-8 w-1 bg-white" 
                      style={{ left: `${randomValue}%` }}
                    />
                  )}
                </div>
              </div>
            )}
            
            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${upgradeResult === 'win' ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
                <div className="flex items-center gap-3">
                  {upgradeResult === 'win' ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                      <div>
                        <h3 className="font-bold text-green-500">Успешный апгрейд!</h3>
                        <p className="text-sm">Вы получили {targetSkin?.name}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-red-500" />
                      <div>
                        <h3 className="font-bold text-red-500">Неудачный апгрейд</h3>
                        <p className="text-sm">Вы потеряли {selectedSkin?.name}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {selectedSkin && targetSkin && !isUpgrading && (
              <Button 
                size="lg" 
                className={`mt-8 ${!showResult ? 'animate-pulse bg-gradient-to-r from-primary to-purple-500' : 'bg-secondary'}`}
                onClick={showResult ? resetUpgrade : startUpgrade}
              >
                {showResult ? (
                  'Еще раз'
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Начать апгрейд
                  </>
                )}
              </Button>
            )}
          </div>
          
          {/* Правая колонка - выбор целевого скина */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Выберите скин для получения</h2>
            
            {selectedSkin ? (
              <Tabs defaultValue="recommended">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recommended">Рекомендуемые</TabsTrigger>
                  <TabsTrigger value="all">Все скины</TabsTrigger>
                </TabsList>
                <TabsContent value="recommended" className="space-y-4 mt-4">
                  {targetSkins.map((skin) => (
                    <button
                      key={skin.id}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border ${rarityColors[skin.rarity]} hover:bg-accent/50 transition-colors`}
                      onClick={() => {
                        selectTargetSkin(skin);
                        resetUpgrade();
                      }}
                    >
                      <img src={skin.image} alt={skin.name} className="w-12 h-12 object-cover rounded" />
                      <div className="text-left flex-1">
                        <p className={`font-medium ${rarityText[skin.rarity]}`}>{skin.name}</p>
                        <p className="text-sm text-muted-foreground">${skin.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Множитель</p>
                        <p className="font-medium">x{(skin.price / selectedSkin.price).toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </TabsContent>
                <TabsContent value="all" className="space-y-4 mt-4">
                  <p className="text-muted-foreground text-center py-8">
                    В полной версии будет доступно более 10,000 скинов для апгрейда!
                  </p>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-muted-foreground">Сначала выберите скин для апгрейда</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
