import { createServerFn } from "@tanstack/react-start";
import { fetchGoaWeather } from "./live-data";
import type { DayWeather } from "./types";

export const getGoaWeather = createServerFn({ method: "POST" }).handler(
  async (): Promise<DayWeather[]> => {
    try {
      return await fetchGoaWeather();
    } catch {
      return [];
    }
  },
);
