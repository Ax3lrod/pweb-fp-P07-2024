import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user_id: null as string | null,
    username: null as string | null,
    role: null as string | null,
    token: null as string | null,
  }),
  actions: {
    setUser(data: {
      id: string;
      username: string;
      role: string;
      token: string;
    }) {
      this.user_id = data.id;
      this.username = data.username;
      this.role = data.role;
      this.token = data.token;

      // Store data in localStorage (client-side only)
      if (import.meta.client) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", data.token);
      }
    },
    loadUser() {
      // Load data from localStorage
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

      // Clear localStorage
      if (import.meta.client) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
      }
    },
  },
});
