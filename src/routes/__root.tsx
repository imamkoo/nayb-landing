import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigations/Navigation";
import { LanguageProvider } from "../contexts/LanguageContext";

interface RouterContext {
  getTitle?: () => string;
}

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});

export function Root() {
  const matches = useRouterState({ select: (s) => s.matches });
  const matchWithTitle = [...matches]
    .reverse()
    .find((match) => match.context.getTitle);
  const title = matchWithTitle?.context.getTitle?.() || "NayBe Global | Education Tour Since 2017";

  document.title = title;

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="flex min-h-screen flex-col bg-cream text-primary-800">
          <Navigation />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </LanguageProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
