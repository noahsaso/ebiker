'use client';

import { useState } from 'react';
import { MapPin, Navigation, Zap, Bike, Lock, X } from 'lucide-react';
import type { Station, Location } from '@/types/station';

interface StationCardProps {
  station: Station;
  userLocation: Location;
}

export default function StationCard({ station, userLocation }: StationCardProps) {
  const [showMap, setShowMap] = useState(false);
  const regularBikes = station.num_bikes_available - station.num_ebikes_available;
  
  // Show distance in feet if less than 0.3 miles, otherwise miles
  const distanceDisplay = station.distance < 0.3 
    ? `${Math.round(station.distance * 5280)} ft`
    : `${station.distance.toFixed(2)} mi`;

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_5px_20px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
      <div className="flex justify-between items-start mb-4">
        <div className="text-xl font-semibold text-gray-800 flex-1 mr-2.5">{station.name}</div>
        <div className="bg-linear-to-br from-primary to-primary-dark text-white py-1.5 px-3 rounded-full text-sm font-semibold whitespace-nowrap">{distanceDisplay}</div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{station.num_ebikes_available}</div>
            <div className="text-xs text-gray-600">E-Bikes</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Bike size={20} className="text-primary" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{regularBikes}</div>
            <div className="text-xs text-gray-600">Regular</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Lock size={20} className="text-primary" />
          <div>
            <div className="text-lg font-semibold text-gray-800">{station.num_docks_available}</div>
            <div className="text-xs text-gray-600">Docks</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 mb-4">
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lon}&destination=${station.lat},${station.lon}&travelmode=walking`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg no-underline text-gray-800 flex items-center justify-center gap-1.5 font-medium transition-all hover:bg-gray-200 hover:border-gray-300"
        >
          <Navigation size={16} /> Directions
        </a>
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex-1 p-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-800 flex items-center justify-center gap-1.5 font-medium transition-all hover:bg-gray-200 hover:border-gray-300 cursor-pointer"
        >
          {showMap ? <X size={16} /> : <MapPin size={16} />}
          {showMap ? 'Hide Map' : 'View Map'}
        </button>
      </div>

      {showMap && (
        <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-200">
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

