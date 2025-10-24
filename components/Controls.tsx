import { RefreshCw } from "lucide-react";
import LocationStatus from "./LocationStatus";
import Filters from "./Filters";
import type { Stats, StatusType } from "@/types/station";
import StatsDisplay from "./Stats";

interface ControlsProps {
  loading: boolean;
  locationStatus: string;
  statusType: StatusType;
  hasResults: boolean;
  maxDistance: number;
  minBikes: number;
  onFindClick: () => void;
  onMaxDistanceChange: (distance: number) => void;
  onMinBikesChange: (bikes: number) => void;
  disabled: boolean;
  stats: Stats;
}

export default function Controls({
  loading,
  locationStatus,
  statusType,
  hasResults,
  maxDistance,
  minBikes,
  onFindClick,
  onMaxDistanceChange,
  onMinBikesChange,
  disabled,
  stats,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-4 bg-white/40 backdrop-blur-lg rounded-lg p-5 shadow-sm border border-white/20">
      <LocationStatus status={locationStatus} type={statusType} />

      <button
        className="w-full p-4 bg-linear-to-br from-primary to-primary-dark text-white border-0 rounded-lg text-lg font-semibold cursor-pointer transition-all flex items-center justify-center gap-2.5 hover:shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        onClick={onFindClick}
        disabled={disabled}
      >
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            <RefreshCw size={20} />
            {hasResults ? "Refresh E-Bike Locations" : "Find Nearest E-Bikes"}
          </>
        )}
      </button>

      <Filters
        maxDistance={maxDistance}
        minBikes={minBikes}
        onMaxDistanceChange={onMaxDistanceChange}
        onMinBikesChange={onMinBikesChange}
      />

      {stats.totalStations > 0 && (
        <div className="-m-5 mt-2">
          <StatsDisplay stats={stats} />
        </div>
      )}
    </div>
  );
}
