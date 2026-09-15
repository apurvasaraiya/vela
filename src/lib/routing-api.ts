import { createServerFn } from "@tanstack/react-start";
import { fetchTravelLeg } from "./live-data";

export const getTravelLeg = createServerFn({ method: "POST" })
  .validator(
    (input: {
      from: { lat: number; lng: number };
      to: { lat: number; lng: number };
    }) => input,
  )
  .handler(async ({ data }) => {
    try {
      return await fetchTravelLeg(data.from, data.to);
    } catch {
      return null;
    }
  });
