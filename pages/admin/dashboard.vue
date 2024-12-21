<template>
  <Navbar />
  <div class="dashboard">
    <h1 class="text-4xl font-bold text-center mb-10 font-[Poppins]">Dashboard Admin</h1>
    <div v-if="occupancy" class="stats">
      <div class="card">
        <h2 class="text-5xl font-bold mb-5 font-[Poppins]">Kamar Kosong</h2>
        <p>{{ occupancy.empty }}</p>
      </div>
      <div class="card">
        <h2 class="text-5xl font-bold mb-5 font-[Poppins]">Kamar Terisi</h2>
        <p>{{ occupancy.filled }}</p>
      </div>
    </div>
  </div>

  <div class="reports">
    <h2 class="text-2xl font-bold text-center mb-5 font-[Poppins]">Laporan</h2>
    <div class="button-group">
      <NuxtLink to="/admin/laporan/fasilitas" class="button">
        <button class="btn mb-10 font-[Poppins]">Laporan Fasilitas</button>
      </NuxtLink>
      <NuxtLink to="/admin/laporan/penghuni">
        <button class="btn mb-10 font-[Poppins]">Laporan Penghuni</button>
      </NuxtLink>
      <NuxtLink to="/admin/penghuni">
        <button class="btn mb-10 font-[Poppins]">Laporan Pembayaran</button>
      </NuxtLink>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const occupancy = ref<{ empty: number; filled: number } | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:4000/api/admin/dashboard');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    occupancy.value = {
      empty: data.occupancy.empty,
      filled: data.occupancy.filled,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
});
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.stats {
  display: flex;
  gap: 20px;
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 50px;
  text-align: center;
  flex: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-bottom: 10px;
  font-size: 18px;
}

.card p {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.reports {
  margin-top: 40px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
