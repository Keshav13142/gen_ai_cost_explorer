import Header from "@/components/header";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="container mx-auto min-w-[90%] space-y-4 py-4 bg-background font-sans antialiased">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
