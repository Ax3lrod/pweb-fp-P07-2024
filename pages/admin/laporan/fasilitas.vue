<template>
  <Navbar />
  <div class="laporan-fasilitas">
    <h1 class="text-4xl font-bold text-center mb-10 font-[Poppins]">Laporan Fasilitas</h1>
    <div v-if="loading" class="text-center text-gray-500">
      Memuat laporan...
    </div>
    <div v-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <div v-else-if="facilities && facilities.length > 0" class="facility-list">
      <div v-for="facility in facilities" :key="facility._id" class="facility-card">
        <h2 class="font-bold">{{ facility.userId?.username || 'Nama tidak tersedia' }}</h2>
        <p>Pesan: {{ facility.message }}</p>
        <p>ID: {{ facility._id }}</p>
        <p>Tanggal Laporan: {{ new Date(facility.createdAt).toLocaleString() }}</p>
      </div>
    </div>
    <div v-else>
      <p class="text-center font-[Poppins]">Tidak ada data fasilitas tersedia.</p>
    </div>
  </div>

  <div class="button-group">
    <NuxtLink to="/admin/dashboard" class="button">
      <button class="btn mb-10 font-[Poppins] ml-10">Back</button>
    </NuxtLink>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const loading = ref(true);
const error = ref<string | null>(null);
const facilities = ref<{ _id: string; message: string; createdAt: Date; userId: { username: string } | null }[]>([]);

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:4000/api/admin/laporan/fasilitas");
    if (!response.ok) {
      throw new Error(`Gagal memuat data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    facilities.value = data.reports;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data.";
  } finally {
    loading.value = false;
  }
});
</script>


<style scoped>
.laporan-fasilitas {
  font-family: 'Poppins', Arial, sans-serif;
  padding: 20px;
}

.facility-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.facility-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.facility-card:hover {
  transform: scale(1.03);
}

.facility-card h2 {
  margin-bottom: 10px;
  color: #333;
}

.facility-card p {
  font-size: 14px;
  color: #555;
}

.button-group {
  display: flex;
  justify-content: left;
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