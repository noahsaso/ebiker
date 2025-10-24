import type { Stats } from '@/types/station';

interface StatsProps {
  stats: Stats;
}

export default function StatsDisplay({ stats }: StatsProps) {
  // Show distance in feet if less than 0.3 miles, otherwise miles
  const nearestDisplay = stats.nearestDistance < 0.3 
    ? `${Math.round(stats.nearestDistance * 5280)} ft`
    : `${stats.nearestDistance.toFixed(2)} mi`;

  return (
    <div className="flex gap-5 p-4 bg-white/20 rounded-b-lg shadow-lg border-t border-white/20">
      <div className="flex-1 text-center">
        <div className="text-3xl font-bold bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent">{stats.totalStations}</div>
        <div className="text-sm text-gray-600 mt-1.5">Stations Found</div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-3xl font-bold bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent">{stats.totalEBikes}</div>
        <div className="text-sm text-gray-600 mt-1.5">E-Bikes Available</div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-3xl font-bold bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent">{nearestDisplay}</div>
        <div className="text-sm text-gray-600 mt-1.5">Nearest</div>
      </div>
    </div>
  );
}

