export type PlaceCategory =
  | "beach"
  | "fort"
  | "heritage"
  | "food"
  | "nature"
  | "market"
  | "experience";

export interface Place {
  id: string;
  name: string;
  area: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  durationMin: number;
  image: string;
  blurb: string;
  tip: string;
  hours?: string;
  wikiTitle?: string;
  bestTime?: string;
}

export interface Stop {
  id: string;
  placeId: string;
  start: string;
  note?: string;
  durationMin?: number;
}

export interface DayPlan {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  stopIds: string[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  vibe: string;
  startDate: string;
  days: DayPlan[];
  stops: Record<string, Stop>;
}

export interface DayWeather {
  date: string;
  tmax: number;
  tmin: number;
  weatherCode: number;
  precipProb: number;
  sunrise: string;
  sunset: string;
  uv: number;
}

export interface TravelLeg {
  fromStopId: string;
  toStopId: string;
  durationMin: number;
  distanceKm: number;
}

export const CATEGORY_LABEL: Record<PlaceCategory, string> = {
  beach: "Beach",
  fort: "Fort",
  heritage: "Heritage",
  food: "Food",
  nature: "Nature",
  market: "Market",
  experience: "Experience",
};
