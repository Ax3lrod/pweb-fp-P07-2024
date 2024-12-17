<template>
  <nav
    :class="[isDark ? 'bg-teal-600' : 'bg-teal-400']"
    class="flex justify-between items-center p-5"
  >
    <!-- Website Name -->
    <div class="text-white text-xl font-bold">KosanIT</div>

    <!-- User Dropdown Menu -->
    <div class="relative">
      <button @click="toggleDropdown" class="flex items-center text-white">
        Hi, {{ user.username }}
        <svg
          class="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12l7 7 7-7"></path>
        </svg>
      </button>

      <ul
        v-if="dropdownOpen"
        :class="[
          'absolute right-0 mt-2 shadow-lg rounded-md w-48',
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-teal-400',
        ]"
      >
        <li
          v-if="user.role === 'USER'"
          @click="navigateToProfile"
          :class="[
            'px-4 py-2',
            isDark
              ? 'hover:bg-teal-500 hover:text-white'
              : 'hover:bg-teal-500 hover:text-white text-teal-400',
            'rounded-t-md',
          ]"
        >
          Profile
        </li>
        <li
          v-else
          @click="navigateToAdminDashboard"
          :class="[
            'px-4 py-2',
            isDark
              ? 'hover:bg-teal-500 hover:text-white'
              : 'hover:bg-teal-500 hover:text-white text-teal-400',
            'rounded-t-md',
          ]"
        >
          Admin Dashboard
        </li>
        <li
          @click="logout"
          :class="[
            'px-4 py-2',
            isDark
              ? 'hover:bg-teal-500 hover:text-white'
              : 'hover:bg-teal-500 hover:text-white text-teal-400',
            'rounded-b-md',
          ]"
        >
          Logout
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const dropdownOpen = ref(false);
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const user = auth;

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const navigateToProfile = () => {
  router.push("/profile");
};

const navigateToAdminDashboard = () => {
  router.push("/admin/dashboard");
};

const logout = () => {
  auth.logout();
  router.push("/auth/login");
};
</script>
