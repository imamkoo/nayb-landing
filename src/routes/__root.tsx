import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import Footer from "../components/Footer";
import Main from "../components/Main";
import MobileMenu from "../components/Navigations/MobileMenu";
import Navigation from "../components/Navigations/Navigation";
import Page from "../components/Page";
import MenuContextProvider from "../contexts/MobileMenuContext";

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
  const title = matchWithTitle?.context.getTitle?.() || "NayBe | Landing Page";

  document.title = title;

  return (
    <QueryClientProvider client={queryClient}>
      <MenuContextProvider>
        <Page>
          <Navigation />
          <Main>
            <Outlet />
          </Main>
          <Footer />
          <MobileMenu />
        </Page>
      </MenuContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
