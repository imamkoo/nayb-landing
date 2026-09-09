import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero/Hero";
import PublicLandingFlow from "../components/PublicLandingFlow/PublicLandingFlow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Hero />
      <PublicLandingFlow />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
