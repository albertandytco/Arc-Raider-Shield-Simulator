"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ShieldCardProps = {
  name: string;
  shieldHealth: number;
  playerHealth: number;
  shieldDamageTaken: number;
  lifeDamageTaken: number;
  shieldColorClass: string;
  borderColorClass: string;
};

const ShieldCard: FC<ShieldCardProps> = ({
  name,
  shieldHealth,
  playerHealth,
  shieldDamageTaken,
  lifeDamageTaken,
  shieldColorClass,
  borderColorClass,
}) => {
  const titleColorClass = shieldColorClass.replace('bg-', 'text-') + " saturate-150";

  return (
    <Card className={`w-full ${borderColorClass} border-2 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
      <CardHeader>
        <CardTitle className={`text-2xl font-bold ${titleColorClass}`}>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium text-foreground">Shield</span>
            <span className="text-sm font-mono text-muted-foreground">{shieldHealth.toFixed(0)} / 100</span>
          </div>
          <Progress value={shieldHealth} indicatorClassName={shieldColorClass} />
        </div>
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium text-foreground">Life</span>
            <span className="text-sm font-mono text-muted-foreground">{playerHealth.toFixed(0)} / 100</span>
          </div>
          <Progress value={playerHealth} indicatorClassName="bg-destructive/80" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Shield Dmg Taken</p>
            <p className="text-2xl font-bold font-mono">{shieldDamageTaken.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Life Dmg Taken</p>
            <p className="text-2xl font-bold font-mono">{lifeDamageTaken.toFixed(0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShieldCard;
