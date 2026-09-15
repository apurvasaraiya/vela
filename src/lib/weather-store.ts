import { useEffect } from "react";
import { create } from "zustand";
import { seasonalFallback } from "./live-data";
import type { DayWeather } from "./types";
import { getGoaWeather } from "./weather-api";

interface WeatherState {
  days: DayWeather[];
  loaded: boolean;
  error: string | null;
  load: () => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  days: [],
  loaded: false,
  error: null,
  load: async () => {
    if (get().loaded) return;
    try {
      const days = await getGoaWeather();
      set({ days, loaded: true, error: null });
    } catch {
      set({
        loaded: true,
        error: "Live weather is offline. Showing typical Goa.",
      });
    }
  },
}));

export function useWeather(): void {
  const load = useWeatherStore((s) => s.load);
  useEffect(() => {
    void load();
  }, [load]);
}

export function weatherFor(date: string, days: DayWeather[]): DayWeather {
  return days.find((d) => d.date === date) ?? seasonalFallback(date);
}
