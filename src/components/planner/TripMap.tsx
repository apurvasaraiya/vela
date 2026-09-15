import { useEffect, useState } from "react";
import type { Stop } from "@/lib/types";

export function TripMap(props: {
  stops: Stop[];
  selectedStopId: string | null;
  onSelect: (id: string) => void;
}) {
  const [Inner, setInner] = useState<null | typeof import("./TripMapInner").TripMapInner>(
    null,
  );

  useEffect(() => {
    let live = true;
    void import("./TripMapInner").then((m) => {
      if (live) setInner(() => m.TripMapInner);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!Inner) {
    return (
      <div className="h-full w-full rounded-[14px] bg-sand animate-pulse" />
    );
  }

  return <Inner {...props} />;
}
