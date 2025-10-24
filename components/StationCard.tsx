'use client';

import { useState } from 'react';
import { MapPin, Navigation, Zap, Bike, Lock, X, Heart } from 'lucide-react';
import type { Station } from '@/types/station';
import clsx from 'clsx';

interface StationCardProps {
  station: Station;
  isFavorite: boolean;
  onToggleFavorite: (stationId: string) => void;
}

export default function StationCard({ station, isFavorite, onToggleFavorite }: StationCardProps) {
  const [showMap, setShowMap] = useState(false);
  const regularBikes = station.num_bikes_available - station.num_ebikes_available;
  
  // Show distance in feet if less than 0.3 miles, otherwise miles
  const distanceDisplay = station.distance < 0.3 
    ? `${Math.round(station.distance * 5280)} ft`
    : `${station.distance.toFixed(2)} mi`;

  return (
    <div className={clsx("flex flex-col gap-4 rounded-lg p-4 sm:p-5 shadow-sm transition-all hover:shadow-lg", isFavorite ? 'bg-white/30' : 'bg-white/40 backdrop-blur-lg')}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5 flex-1">
          <button
            onClick={() => onToggleFavorite(station.station_id)}
            className="p-1 rounded-full transition-colors hover:bg-white/30 cursor-pointer"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={22}
              className={clsx('text-favorite', isFavorite && 'fill-favorite')}
            />
          </button>
          <div className="text-xl font-semibold text-gray-800 flex-1">{station.name}</div>
        </div>
        <div className="bg-linear-to-br from-primary to-primary-dark text-white py-1.5 px-3 rounded-full text-sm font-semibold whitespace-nowrap">{distanceDisplay}</div>
      </div>

      <div className="flex flex-row justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{station.num_ebikes_available}</div>
            <div className="text-xs text-gray-800">E-Bikes</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Bike size={20} className="text-primary" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{regularBikes}</div>
            <div className="text-xs text-gray-800">Regular</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Lock size={20} className="text-primary" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{station.num_docks_available}</div>
            <div className="text-xs text-gray-800">Docks</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}&travelmode=walking`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-1 sm:p-2.5 bg-white/40 rounded-lg no-underline text-gray-800 flex items-center justify-center gap-1.5 font-medium transition-all hover:bg-white/60 shadow-sm"
        >
          <Navigation size={16} /> Directions
        </a>
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex-1 p-1 sm:p-2.5 bg-white/40 rounded-lg text-gray-800 flex items-center justify-center gap-1.5 font-medium transition-all hover:bg-white/60 cursor-pointer shadow-sm"
        >
          {showMap ? <X size={16} /> : <MapPin size={16} />}
          {showMap ? 'Hide Map' : 'View Map'}
        </button>
      </div>

      {showMap && (
        <div className="rounded-lg overflow-hidden border-2 border-white/30">
          <iframe
            width="100%"
            height="250"
            className="max-h-[70vh]"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${station.lat},${station.lon}&zoom=16`}
            allowFullScreen
            title={`Map of ${station.name}`}
          />
        </div>
      )}
    </div>
  );
}

