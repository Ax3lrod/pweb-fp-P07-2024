import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user_id: null as string | null,
    username: null as string | null,
    role: null as string | null,
    token: null as string | null,
  }),
  actions: {
    setUser(data: { id: string; username: string; role: string; token: string }) {
      this.user_id = data.id;
      this.username = data.username;
      this.role = data.role;
      this.token = data.token;

      if (import.meta.client) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", data.token);
      }
    },
    async login(username: string, password: string) {
      // Hardcoded admin credentials
      if (username === "Admin" && password === "Admin_123") {
        this.setUser({
          id: "1", // Example ID for admin
          username: "Admin",
          role: "ADMIN",
          token: "admin-token", // Example token
        });
        return "admin";
      }

      // Add API call for non-admin users if needed
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      this.setUser(data);
      return data.role;
    },
    loadUser() {
      if (import.meta.client) {
        this.user_id = localStorage.getItem("user_id");
        this.username = localStorage.getItem("username");
        this.role = localStorage.getItem("role");
        this.token = localStorage.getItem("token");
      }
    },
    logout() {
      this.user_id = null;
      this.username = null;
      this.role = null;
      this.token = null;

      if (import.meta.client) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
      }
    },
  },
});
