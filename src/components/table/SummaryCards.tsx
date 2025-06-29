
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface SummaryCardData {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  color?: string;
}

interface SummaryCardsProps {
  cards: SummaryCardData[];
  loading?: boolean;
}

const SummaryCards = ({ cards, loading = false }: SummaryCardsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-8 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-24" />
                </div>
                <div className="h-12 w-12 bg-muted rounded-lg animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">
                    {typeof card.value === 'number' 
                      ? new Intl.NumberFormat('pt-BR').format(card.value)
                      : card.value
                    }
                  </p>
                  {card.description && (
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  )}
                  {card.trend && (
                    <div className="flex items-center gap-1">
                      {card.trend.type === 'positive' ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : card.trend.type === 'negative' ? (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      ) : null}
                      <span className={cn(
                        "text-xs font-medium",
                        card.trend.type === 'positive' && "text-green-600",
                        card.trend.type === 'negative' && "text-red-600",
                        card.trend.type === 'neutral' && "text-muted-foreground"
                      )}>
                        {card.trend.value > 0 && card.trend.type !== 'neutral' ? '+' : ''}
                        {card.trend.value}% {card.trend.label}
                      </span>
                    </div>
                  )}
                </div>
                <div className={cn(
                  "p-3 rounded-lg",
                  card.color || "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "h-6 w-6",
                    card.color ? "text-white" : "text-primary"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;
