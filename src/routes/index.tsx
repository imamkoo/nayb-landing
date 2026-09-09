import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero/Hero";
import PlatformFlow from "../components/PlatformFlow/PlatformFlow";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Hero />
      <PlatformFlow />
    </>
  );
}
