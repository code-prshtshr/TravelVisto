import type { RouteConfig } from "@react-router/dev/routes";
import { layout, route } from "@react-router/dev/routes";

export default [
  route("sign-in", "routes/admin/root/sign-in.tsx"),
  route("auth-callback", "routes/admin/root/auth-callback.tsx"),
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-user.tsx"),
  ]),
] satisfies RouteConfig;
