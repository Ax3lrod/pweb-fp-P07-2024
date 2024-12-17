import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  // Load user data on the client-side
  if (import.meta.client) {
    authStore.loadUser();
  }
});
