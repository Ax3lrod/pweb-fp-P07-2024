<template>
  <footer
    :class="[isDark ? 'bg-teal-600' : 'bg-teal-400']"
    class="text-white p-8"
  >
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Title -->
      <div>
        <h2 class="font-bold text-xl mb-4">KosanIT</h2>
        <p class="text-sm">
          Your comfortable living space in a digital world, empowering your
          student life.
        </p>
      </div>

      <!-- About -->
      <div>
        <h3 class="font-bold text-lg mb-4">About</h3>
        <p class="text-sm">
          KosanIT offers affordable and modern living spaces tailored for
          students.
        </p>
      </div>

      <!-- Contacts -->
      <div>
        <h3 class="font-bold text-lg mb-4">Contacts</h3>
        <ul class="space-y-2 text-sm">
          <li><strong>Email:</strong> support@kosanit.com</li>
          <li><strong>Phone:</strong> +62 812 3456 7890</li>
          <li>
            <strong>Address:</strong> Gedung Tower 2 ITS, Keputih, Sukolilo,
            Surabaya
          </li>
        </ul>
      </div>

      <!-- Google Maps -->
      <div>
        <h3 class="font-bold text-lg mb-4">Find Us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.4021852787162!2d112.79477318269775!3d-7.285279175949456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb9a342917e1%3A0xd76391b50ff046c8!2sDepartment%20of%20Information%20Technology%20(IT)%20ITS!5e0!3m2!1sen!2sid!4v1732648719575!5m2!1sen!2sid"
          height="150"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full"
        ></iframe>
      </div>
    </div>

    <div class="mt-8 text-center text-sm">
      &copy; {{ new Date().getFullYear() }} KosanIT. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
