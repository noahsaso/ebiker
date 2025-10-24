import { RefreshCw } from 'lucide-react';
import LocationStatus from './LocationStatus';
import Filters from './Filters';
import type { StatusType } from '@/types/station';

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
}: ControlsProps) {
  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow-sm">
      <LocationStatus status={locationStatus} type={statusType} />

      <button
        className="w-full p-4 bg-linear-to-br from-primary to-primary-dark text-white border-0 rounded-lg text-lg font-semibold cursor-pointer transition-all flex items-center justify-center gap-2.5 hover:shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
        onClick={onFindClick}
        disabled={disabled}
      >
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            <RefreshCw size={20} />
            {hasResults ? 'Refresh E-Bike Locations' : 'Find Nearest E-Bikes'}
          </>
        )}
      </button>

      <Filters
        maxDistance={maxDistance}
        minBikes={minBikes}
        onMaxDistanceChange={onMaxDistanceChange}
        onMinBikesChange={onMinBikesChange}
      />
    </div>
  );
}

