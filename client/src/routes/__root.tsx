import Header from "@/components/header";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="container mx-auto min-w-[90%] space-y-5 py-5 bg-background font-sans antialiased">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
