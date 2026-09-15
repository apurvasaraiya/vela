import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";
import { weatherLabel, weatherTone } from "@/lib/live-data";
import type { DayWeather } from "@/lib/types";
import { cn } from "@/lib/utils";

function Icon({ code, className }: { code: number; className?: string }) {
  const tone = weatherTone(code);
  if (tone === "rain") return <CloudRain className={className} strokeWidth={1.75} />;
  if (tone === "cloud") return <Cloud className={className} strokeWidth={1.75} />;
  if (code === 0) return <Sun className={className} strokeWidth={1.75} />;
  return <CloudSun className={className} strokeWidth={1.75} />;
}

export function WeatherChip({
  weather,
  compact,
  className,
}: {
  weather: DayWeather;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1.5 text-sm text-ink-soft shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <Icon code={weather.weatherCode} className="size-4 text-lagoon" />
      <span className="tabular-nums font-medium">
        {weather.tmax}° / {weather.tmin}°
      </span>
      {compact ? null : (
        <>
          <span className="text-subtle">·</span>
          <span className="text-muted">{weatherLabel(weather.weatherCode)}</span>
        </>
      )}
    </div>
  );
}
