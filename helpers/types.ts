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

export interface KeyCDNResponse {
  status: string;
  description: string;
  data: {
    geo: {
      host: string;
      ip: string;
      rdns: string;
      asn: number;
      isp: string;
      country_name: string;
      country_code: string;
      region_name: string;
      region_code: string;
      city: string;
      postal_code: string;
      continent_name: string;
      continent_code: string;
      latitude: number;
      longitude: number;
      metro_code: number;
      timezone: string;
      datetime: string;
    };
  };
}

export interface DataProps {
  data: NativeLandTerritoriesResponse;
  error?: string;
}

export interface DebugProps {
  remoteAddress: string;
}
