"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Heart } from "lucide-react";
import Controls from "./Controls";
import StatsDisplay from "./Stats";
import StationCard from "./StationCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import NoResults from "./NoResults";
import { getUserLocation, isGeolocationSupported } from "@/utils/geolocation";
import { fetchStationsWithEBikes } from "@/utils/citibike";
import type { Location, Station, Stats, StatusType } from "@/types/station";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

const maxDistanceAtom = atomWithStorage("maxDistance", 0.5);
const minBikesAtom = atomWithStorage("minBikes", 2);
const favoritesAtom = atomWithStorage<string[]>("favoriteStations", []);

export default function CitibikeEBikeFinder() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [allStations, setAllStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState(
    "Ready to find your location..."
  );
  const [statusType, setStatusType] = useState<StatusType>("waiting");
  const [error, setError] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useAtom(maxDistanceAtom);
  const [minBikes, setMinBikes] = useAtom(minBikesAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [showFavorites, setShowFavorites] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalStations: 0,
    totalEBikes: 0,
    nearestDistance: 0,
  });

  const findNearestEBikes = async () => {
    setLoading(true);
    setError(null);
    setStatusType("loading");
    setLocationStatus("Getting your location...");

    try {
      // Get user's location
      const location = await getUserLocation();
      setUserLocation(location);

      setStatusType("success");
      setLocationStatus(
        `Location found: ${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`
      );

      // Fetch stations with e-bikes
      const stationsWithEBikes = await fetchStationsWithEBikes(location);
      setAllStations(stationsWithEBikes);
    } catch (err) {
      setStatusType("error");
      setLocationStatus("Error getting location");
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (stationId: string) => {
    setFavorites((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId]
    );
  };

  // Filter stations whenever filters or allStations change
  useEffect(() => {
    if (!allStations.length) return;

    const filtered = allStations.filter(
      (station) =>
        station.distance <= maxDistance &&
        station.num_ebikes_available >= minBikes
    );

    setFilteredStations(filtered);

    // Update stats
    if (filtered.length > 0) {
      const totalBikes = filtered.reduce(
        (sum, s) => sum + s.num_ebikes_available,
        0
      );
      setStats({
        totalStations: filtered.length,
        totalEBikes: totalBikes,
        nearestDistance: parseFloat(filtered[0].distance.toFixed(2)),
      });
    } else {
      setStats({
        totalStations: 0,
        totalEBikes: 0,
        nearestDistance: 0,
      });
    }
  }, [allStations, maxDistance, minBikes, favorites]);

  // Check geolocation support and auto-fetch on mount
  useEffect(() => {
    if (!isGeolocationSupported()) {
      setStatusType("error");
      setLocationStatus("Geolocation is not supported by your browser");
      return;
    }

    // Automatically try to get location and fetch stations
    const autoFetch = async () => {
      setLoading(true);
      setStatusType("loading");
      setLocationStatus("Getting your location...");

      try {
        const location = await getUserLocation();
        setUserLocation(location);

        setStatusType("success");
        setLocationStatus(
          `Location found: ${location.lat.toFixed(4)}, ${location.lon.toFixed(
            4
          )}`
        );

        const stationsWithEBikes = await fetchStationsWithEBikes(location);
        setAllStations(stationsWithEBikes);
      } catch {
        // If auto-fetch fails (e.g., permission not granted yet), show friendly message
        setStatusType("waiting");
        setLocationStatus("Click the button to find e-bikes near you");
        setError(null); // Clear error for auto-fetch failures
      } finally {
        setLoading(false);
      }
    };

    autoFetch();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-primary to-primary-dark p-5">
      <div className="max-w-3xl mx-auto">
        <header className="text-center text-white mb-8">
          <h1 className="text-4xl mb-2.5 [text-shadow:2px_2px_4px_rgba(0,0,0,0.2)]">
            🚴‍♂️ Citibike E-Bike Finder
          </h1>
          <p className="text-lg opacity-90">Find e-bikes available near you</p>
        </header>

        <Controls
          loading={loading}
          locationStatus={locationStatus}
          statusType={statusType}
          hasResults={allStations.length > 0}
          maxDistance={maxDistance}
          minBikes={minBikes}
          onFindClick={findNearestEBikes}
          onMaxDistanceChange={setMaxDistance}
          onMinBikesChange={setMinBikes}
          disabled={
            loading || (statusType === "error" && !isGeolocationSupported())
          }
        />

        {stats.totalStations > 0 && <StatsDisplay stats={stats} />}

        <div>
          {loading && <LoadingSpinner />}

          {error && !loading && <ErrorMessage error={error} />}

          {!loading &&
            !error &&
            filteredStations.length === 0 &&
            allStations.length > 0 && <NoResults />}

          {!loading &&
            !error &&
            filteredStations.length > 0 &&
            userLocation && (
              <>
                {/* Favorites Section */}
                {(() => {
                  const favoriteStations = filteredStations.filter((station) =>
                    favorites.includes(station.station_id)
                  );

                  if (favoriteStations.length === 0) return null;

                   return (
                     <div className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden">
                       <button
                         onClick={() => setShowFavorites(!showFavorites)}
                         className="w-full p-4 flex items-center justify-between transition-all hover:bg-gray-50 cursor-pointer"
                       >
                         <div className="flex items-center gap-2">
                           <Heart size={20} className="fill-favorite text-favorite" />
                           <span className="text-lg font-semibold text-gray-800">
                             {favoriteStations.length} Favorite
                             {favoriteStations.length > 1 ? "s" : ""}
                           </span>
                         </div>
                         <ChevronDown
                           size={20}
                           className={`text-gray-600 transition-transform ${
                             showFavorites ? "rotate-180" : ""
                           }`}
                         />
                       </button>
                       {showFavorites && (
                         <div className="p-4 bg-gray-50 border-t border-gray-200">
                           <div className="grid gap-4">
                             {favoriteStations.map((station) => (
                               <StationCard
                                 key={station.station_id}
                                 station={station}
                                 userLocation={userLocation}
                                 isFavorite={true}
                                 onToggleFavorite={toggleFavorite}
                               />
                             ))}
                           </div>
                         </div>
                       )}
                     </div>
                   );
                })()}

                {/* Regular Filtered Stations */}
                {(() => {
                  const nonFavoriteStations = filteredStations.filter(
                    (station) => !favorites.includes(station.station_id)
                  );

                  if (nonFavoriteStations.length === 0) return null;

                  return (
                    <div className="grid gap-4">
                      {nonFavoriteStations.slice(0, 20).map((station) => (
                        <StationCard
                          key={station.station_id}
                          station={station}
                          userLocation={userLocation}
                          isFavorite={false}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
        </div>
      </div>
    </div>
  );
}
