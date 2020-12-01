interface Coordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface NativeLandTerritories {
  type: "Feature";
  properties: {
    Name: string;
    FrenchName: string;
    Slug: string;
    description: string;
    FrenchDescription: string;
    color: string;
  };
  id: string;
  geometry: {
    coordinates: Array<[number, number]>;
  };
}

export type NativeLandTerritoriesResponse = Array<NativeLandTerritories>;

export interface Position {
  readonly coords: Coordinates;
  readonly timestamp: number;
}

export interface PositionError {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
}

export interface GeoIpLiteLookup {
  range: [number, number];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: [number, number];
  metro: number;
  area: number;
}
