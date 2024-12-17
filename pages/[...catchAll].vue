<script setup lang="ts">
// Redirect all unknown routes to the 404 error page.
definePageMeta({
  layout: "error",
});
</script>

<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <h1 class="text-6xl font-bold text-teal-500 mb-4">404</h1>
    <p class="text-2xl mb-6">Oops! Page ngga ada.</p>
    <NuxtLink to="/" class="bg-teal-500 px-6 py-2 rounded hover:bg-teal-600">
      Kembali
    </NuxtLink>
  </div>
</template>
