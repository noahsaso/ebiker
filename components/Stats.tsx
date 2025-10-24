import type { Stats } from '@/types/station';

interface StatsProps {
  stats: Stats;
}

export default function StatsDisplay({ stats }: StatsProps) {
  return (
    <div className="flex gap-5 mb-5 p-4 bg-white rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.1)]">
      <div className="flex-1 text-center">
        <div className="text-3xl font-bold bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent">{stats.totalStations}</div>
        <div className="text-sm text-gray-600 mt-1.5">Stations Found</div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-3xl font-bold bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent">{stats.totalEBikes}</div>
        <div className="text-sm text-gray-600 mt-1.5">E-Bikes Available</div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-3xl font-bold bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent">{stats.nearestDistance}</div>
        <div className="text-sm text-gray-600 mt-1.5">Nearest (miles)</div>
      </div>
    </div>
  );
}

