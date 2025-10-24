export interface Location {
  lat: number;
  lon: number;
}

export interface Station {
  station_id: string;
  name: string;
  lat: number;
  lon: number;
  capacity: number;
  num_bikes_available: number;
  num_ebikes_available: number;
  num_docks_available: number;
  distance: number;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
}

export interface StationInfo {
  station_id: string;
  name: string;
  lat: number;
  lon: number;
  capacity: number;
}

export interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_ebikes_available: number;
  num_docks_available: number;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
}

export interface Stats {
  totalStations: number;
  totalEBikes: number;
  nearestDistance: number;
}

export type StatusType = 'waiting' | 'loading' | 'success' | 'error';

