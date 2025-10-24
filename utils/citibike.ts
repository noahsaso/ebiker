import type { Station, StationInfo, StationStatus, Location } from '@/types/station';
import { calculateDistance } from './distance';

const STATION_INFO_URL = 'https://gbfs.lyft.com/gbfs/2.3/bkn/en/station_information.json';
const STATION_STATUS_URL = 'https://gbfs.lyft.com/gbfs/2.3/bkn/en/station_status.json';

interface StationInfoResponse {
  data: {
    stations: StationInfo[];
  };
}

interface StationStatusResponse {
  data: {
    stations: StationStatus[];
  };
}

/**
 * Fetch all Citibike stations with available e-bikes
 * @param userLocation User's current location
 * @returns Array of stations sorted by distance with e-bikes available
 */
export async function fetchStationsWithEBikes(
  userLocation: Location
): Promise<Station[]> {
  // Fetch station information and status in parallel
  const [stationInfoResponse, stationStatusResponse] = await Promise.all([
    fetch(STATION_INFO_URL),
    fetch(STATION_STATUS_URL),
  ]);

  const stationInfo: StationInfoResponse = await stationInfoResponse.json();
  const stationStatus: StationStatusResponse = await stationStatusResponse.json();

  // Create a map of station status by ID for quick lookup
  const statusMap = new Map<string, StationStatus>();
  stationStatus.data.stations.forEach((station) => {
    statusMap.set(station.station_id, station);
  });

  // Combine station info with status and calculate distances
  const stationsWithEBikes = stationInfo.data.stations
    .map((info) => {
      const status = statusMap.get(info.station_id);
      
      // Skip stations without status or without e-bikes
      if (!status || !status.num_ebikes_available || status.num_ebikes_available === 0) {
        return null;
      }

      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lon,
        info.lat,
        info.lon
      );

      return {
        ...info,
        ...status,
        distance,
      } as Station;
    })
    .filter((station): station is Station => station !== null);

  // Sort by distance (nearest first)
  stationsWithEBikes.sort((a, b) => a.distance - b.distance);

  return stationsWithEBikes;
}

