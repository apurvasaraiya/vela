import { createFileRoute } from "@tanstack/react-router";
import { TripPlanner } from "@/components/planner/TripPlanner";

export const Route = createFileRoute("/trip")({ component: TripPage });

function TripPage() {
  return <TripPlanner />;
}
