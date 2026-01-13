"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type ShieldCardProps = {
  name: string;
  rarity: string;
  rarityColorClasses: string;
  shieldHealth: number;
  maxShieldHealth: number;
  playerHealth: number;
  shieldDamageTaken: number;
  lifeDamageTaken: number;
  shieldColorClass: string;
  borderColorClass: string;
  mitigation: number;
  slowness: number;
};

const ShieldCard: FC<ShieldCardProps> = ({
  name,
  rarity,
  rarityColorClasses,
  shieldHealth,
  maxShieldHealth,
  playerHealth,
  shieldDamageTaken,
  lifeDamageTaken,
  shieldColorClass,
  borderColorClass,
  mitigation,
  slowness,
}) => {
  const shieldProgress = maxShieldHealth > 0 ? (shieldHealth / maxShieldHealth) * 100 : 0;

  return (
    <Card className={`w-full border-2 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${borderColorClass}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">{name}</CardTitle>
          <div className={`px-3 py-1 text-sm font-semibold rounded-full border ${rarityColorClasses}`}>
            {rarity}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <span className="font-bold text-base">{maxShieldHealth}</span>
            <span className="text-muted-foreground block">cargas</span>
          </div>
          <div>
            <span className="font-bold text-base">{(mitigation * 100).toFixed(1)}%</span>
            <span className="text-muted-foreground block">mitig.</span>
          </div>
          <div>
            <span className="font-bold text-base">{slowness}%</span>
            <span className="text-muted-foreground block">lent.</span>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium text-foreground">Escudo</span>
            <span className="text-sm font-mono text-muted-foreground">{shieldHealth.toFixed(0)} / {maxShieldHealth}</span>
          </div>
          <Progress value={shieldProgress} indicatorClassName={shieldColorClass} />
        </div>
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium text-foreground">Vida</span>
            <span className="text-sm font-mono text-muted-foreground">{playerHealth.toFixed(0)} / 100</span>
          </div>
          <Progress value={playerHealth} indicatorClassName="bg-destructive/80" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Dano ao Escudo</p>
            <p className="text-2xl font-bold font-mono">{shieldDamageTaken.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dano à Vida</p>
            <p className="text-2xl font-bold font-mono">{lifeDamageTaken.toFixed(0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShieldCard;
