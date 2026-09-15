import { createServerFn } from "@tanstack/react-start";
import { PLACES } from "./goa-places";

const PLACE_IDS = PLACES.map((p) => p.id).join(", ");

export const reshapeItinerary = createServerFn({ method: "POST" })
  .validator((input: { vibe: string; notes?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI is not available right now." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 900,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "You plan visual travel itineraries for Goa, India. Return ONLY compact JSON, no markdown. " +
              "Use only the provided place ids. Three days, 4 to 6 stops each, geographically sensible order, no hotels or bookings.",
          },
          {
            role: "user",
            content: `Reshape a 3-day Goa itinerary. Traveller vibe: ${data.vibe}. Extra notes: ${data.notes ?? "none"}.\nAllowed place ids: ${PLACE_IDS}.\nJSON shape: {\"days\":[{\"title\":\"\",\"subtitle\":\"\",\"placeIds\":[\"id\"]}]}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Planner service error ${res.status}` };
    }

    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const text = body.choices[0]?.message.content ?? "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return { ok: false as const, error: "Could not read a plan." };

    try {
      const parsed = JSON.parse(match[0]) as {
        days: { title: string; subtitle: string; placeIds: string[] }[];
      };
      const allowed = new Set(PLACES.map((p) => p.id));
      const days = (parsed.days ?? []).slice(0, 3).map((day) => ({
        title: String(day.title ?? "").slice(0, 48),
        subtitle: String(day.subtitle ?? "").slice(0, 64),
        placeIds: (day.placeIds ?? []).filter((id) => allowed.has(id)).slice(0, 6),
      }));
      if (days.some((d) => d.placeIds.length < 3)) {
        return { ok: false as const, error: "That plan was too thin. Try another vibe." };
      }
      return { ok: true as const, days };
    } catch {
      return { ok: false as const, error: "Could not read a plan." };
    }
  });
