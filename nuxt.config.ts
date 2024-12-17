// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {},
  colorMode: {
    preference: "light",
  },
  plugins: ["~/plugins/auth.ts"],
  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@vee-validate/nuxt",
    "@nuxt/ui",
  ],
  pages: true,
});
