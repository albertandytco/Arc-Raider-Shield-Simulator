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
import { Card } from "@/components/ui/card";
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
];

const getInitialShieldsState = () => [
  {
    id: 'light',
    name: "Escudo Leve",
    mitigation: 0.4,
    shieldColorClass: "bg-blue-500",
    borderColorClass: "border-blue-500",
    maxShieldHealth: 40,
    shieldHealth: 40,
    playerHealth: 100,
    shieldDamageTaken: 0,
    lifeDamageTaken: 0,
  },
  {
    id: 'medium',
    name: "Escudo Médio",
    mitigation: 0.425,
    shieldColorClass: "bg-blue-500",
    borderColorClass: "border-blue-500",
    maxShieldHealth: 70,
    shieldHealth: 70,
    playerHealth: 100,
    shieldDamageTaken: 0,
    lifeDamageTaken: 0,
  },
  {
    id: 'heavy',
    name: "Escudo Pesado",
    mitigation: 0.525,
    shieldColorClass: "bg-blue-500",
    borderColorClass: "border-blue-500",
    maxShieldHealth: 80,
    shieldHealth: 80,
    playerHealth: 100,
    shieldDamageTaken: 0,
    lifeDamageTaken: 0,
  },
];

type ShieldState = ReturnType<typeof getInitialShieldsState>;

export default function Home() {
  const [shields, setShields] = useState<ShieldState>(getInitialShieldsState());
  const [selectedWeapon, setSelectedWeapon] = useState(WEAPONS[0].name);

  const handleFire = useCallback(() => {
    const weapon = WEAPONS.find(w => w.name === selectedWeapon);
    if (!weapon) return;

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

        return {
          ...shield,
          shieldHealth: newShieldHealth,
          playerHealth: newPlayerHealth,
          shieldDamageTaken: shield.shieldDamageTaken + actualDamageToShield,
          lifeDamageTaken: shield.lifeDamageTaken + damageToLife,
        };
      })
    );
  }, [selectedWeapon]);

  const handleReset = useCallback(() => {
    setShields(getInitialShieldsState());
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
            shieldHealth={shield.shieldHealth}
            maxShieldHealth={shield.maxShieldHealth}
            playerHealth={shield.playerHealth}
            shieldDamageTaken={shield.shieldDamageTaken}
            lifeDamageTaken={shield.lifeDamageTaken}
            shieldColorClass={shield.shieldColorClass}
            borderColorClass={shield.borderColorClass}
          />
        ))}
      </div>
    </main>
  );
}
