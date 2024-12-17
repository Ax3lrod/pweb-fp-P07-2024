export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");

    // If the user is logged in and trying to access the login page, redirect to the root (/)
    if (token && to.path === "/auth/login") {
      return navigateTo("/");
    }

    // If no token and not already on the login page, redirect to login
    if (!token && to.path !== "/auth/login") {
      return navigateTo("/auth/login");
    }
  }
});
