"use client";

import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Flame, RotateCcw } from "lucide-react";
import ShieldCard from "@/components/shield-card";

const WEAPONS = [
  { name: "Ferro", damage: 40 },
  { name: "Chaleira", damage: 10 },
  { name: "Matraca", damage: 9 },
  { name: "Costurador", damage: 7 },
  { name: "Toro", damage: 67.5 },
  { name: "Grampo", damage: 20 },
  { name: "Burleta", damage: 10 },
  { name: "Bigorna", damage: 40 },
  { name: "Arpeggio", damage: 9.5 },
  { name: "Tempestade", damage: 10 },
  { name: "Bettina", damage: 14 },
  { name: "Renegade", damage: 35 },
  { name: "Aphelion", damage: 25 },
  { name: "Bobcat", damage: 6 },
  { name: "Vulcano", damage: 49.5 },
  { name: "Venator", damage: 18 },
  { name: "Torrente", damage: 8 },
  { name: "Osprey", damage: 45 },
  { name: "Jupiter", damage: 60 },
  { name: "Quebra-cascos", damage: 100 },
  { name: "Equalizador", damage: 8 },
];

const getInitialShieldsState = () => [
  {
    id: 'light',
    name: "Escudo Leve",
    rarity: "Incomum",
    rarityColorClasses: "bg-green-900/80 text-green-300 border-green-700",
    mitigation: 0.4,
    shieldColorClass: "bg-blue-400",
    borderColorClass: "border-transparent",
    maxShieldHealth: 40,
    shieldHealth: 40,
    playerHealth: 100,
    shieldDamageTaken: 0,
    lifeDamageTaken: 0,
    slowness: 0,
  },
  {
    id: 'medium',
    name: "Escudo Médio",
    rarity: "Raro",
    rarityColorClasses: "bg-blue-900/80 text-blue-300 border-blue-700",
    mitigation: 0.425,
    shieldColorClass: "bg-blue-400",
    borderColorClass: "border-transparent",
    maxShieldHealth: 70,
    shieldHealth: 70,
    playerHealth: 100,
    shieldDamageTaken: 0,
    lifeDamageTaken: 0,
    slowness: 5,
  },
  {
    id: 'heavy',
    name: "Escudo Pesado",
    rarity: "Épico",
    rarityColorClasses: "bg-purple-900/80 text-purple-300 border-purple-700",
    mitigation: 0.525,
    shieldColorClass: "bg-blue-400",
    borderColorClass: "border-transparent",
    maxShieldHealth: 80,
    shieldHealth: 80,
    playerHealth: 100,
    shieldDamageTaken: 0,
    lifeDamageTaken: 0,
    slowness: 15,
  },
];

type ShieldState = ReturnType<typeof getInitialShieldsState>;

export default function Home() {
  const [shields, setShields] = useState<ShieldState>(getInitialShieldsState());
  const [selectedWeapon, setSelectedWeapon] = useState(WEAPONS[0].name);
  const [shotCount, setShotCount] = useState(0);

  const handleFire = useCallback(() => {
    const weapon = WEAPONS.find(w => w.name === selectedWeapon);
    if (!weapon) return;

    setShotCount(prevCount => prevCount + 1);

    const incomingDamage = weapon.damage;

    setShields(prevShields =>
      prevShields.map(shield => {
        if (shield.playerHealth <= 0) return shield;

        let damageToShield = 0;
        let damageToLife = 0;

        if (shield.shieldHealth > 0) {
          damageToShield = incomingDamage;
          damageToLife = incomingDamage * (1 - shield.mitigation);
        } else {
          damageToShield = 0;
          damageToLife = incomingDamage;
        }

        const newShieldHealth = Math.max(0, shield.shieldHealth - damageToShield);
        const newPlayerHealth = Math.max(0, shield.playerHealth - damageToLife);
        
        const actualDamageToShield = shield.shieldHealth - newShieldHealth;
        const actualDamageToLife = shield.playerHealth - newPlayerHealth;

        return {
          ...shield,
          shieldHealth: newShieldHealth,
          playerHealth: newPlayerHealth,
          shieldDamageTaken: shield.shieldDamageTaken + actualDamageToShield,
          lifeDamageTaken: shield.lifeDamageTaken + actualDamageToLife,
        };
      })
    );
  }, [selectedWeapon]);

  const handleReset = useCallback(() => {
    setShields(getInitialShieldsState());
    setShotCount(0);
  }, []);

  const allTargetsDefeated = shields.every(s => s.playerHealth <= 0);

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 font-body">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold font-headline tracking-tight mb-2">Simulador de Escudos</h1>
        <p className="text-lg text-muted-foreground">Arc Raiders - Visualize o Dano em Tempo Real</p>
      </div>

      <Card className="mb-8 p-4 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="w-full sm:w-auto flex-grow max-w-xs">
            <Label htmlFor="weapon-select" className="text-sm font-medium mb-2 block">Arma</Label>
            <Select value={selectedWeapon} onValueChange={setSelectedWeapon}>
              <SelectTrigger id="weapon-select" className="w-full">
                <SelectValue placeholder="Selecione uma arma" />
              </SelectTrigger>
              <SelectContent>
                {WEAPONS.map(weapon => (
                  <SelectItem key={weapon.name} value={weapon.name}>
                    {weapon.name} ({weapon.damage} dano)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-center">
            <Label className="text-sm font-medium">Tiros</Label>
            <div className="text-3xl font-bold font-mono p-2 rounded-lg bg-muted min-w-[60px]">
              {shotCount}
            </div>
          </div>

          <div className="flex gap-2 self-end">
            <Button size="lg" onClick={handleFire} disabled={allTargetsDefeated}>
              <Flame className="mr-2 h-5 w-5" /> Atirar
            </Button>

            <Button size="lg" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-5 w-5" /> Reiniciar
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {shields.map(shield => (
          <ShieldCard
            key={shield.id}
            name={shield.name}
            rarity={shield.rarity}
            rarityColorClasses={shield.rarityColorClasses}
            shieldHealth={shield.shieldHealth}
            maxShieldHealth={shield.maxShieldHealth}
            playerHealth={shield.playerHealth}
            shieldDamageTaken={shield.shieldDamageTaken}
            lifeDamageTaken={shield.lifeDamageTaken}
            shieldColorClass={shield.shieldColorClass}
            borderColorClass={shield.borderColorClass}
            mitigation={shield.mitigation}
            slowness={shield.slowness}
          />
        ))}
      </div>

      <Card className="mt-8 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-blue-400 mb-4">COMO FUNCIONA</h3>
          <p className="text-muted-foreground mb-4">
            Em Arc Raiders, o escudo mitiga o dano -- Não bloqueia. Você sempre toma dano na vida, mesmo com escudo cheio.
          </p>
          <div className="bg-muted p-3 rounded-lg mb-4">
            <p className="text-blue-300 font-mono text-center">Dano na vida = Dano x (1 - Mitigação)</p>
          </div>
          <p className="text-muted-foreground">
            Exemplo: Bigorna (40 dmg) + Escudo Leve (40% Mitig.) = 24 de dano na vida.
          </p>
        </CardContent>
      </Card>
      
      <footer className="text-center mt-12 mb-4">
        <p className="text-sm font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Feito por Alt_BR, inspirado no app criado pelo HADOMANCER
        </p>
      </footer>
    </main>
  );
} 
