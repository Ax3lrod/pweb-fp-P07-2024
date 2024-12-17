<script setup>
definePageMeta({
  middleware: ["auth"],
});

const items = [
  "/images/fasilitas/fasilitas_1.jpg",
  "/images/fasilitas/fasilitas_2.jpg",
  "/images/fasilitas/fasilitas_3.jpg",
  "/images/fasilitas/fasilitas_4.jpg",
  "/images/fasilitas/fasilitas_5.jpg",
];
</script>

<template>
  <Navbar />
  <main
    class="w-full min-h-screen flex flex-col py-10 items-center font-[Poppins]"
  >
    <h1 class="text-4xl font-bold text-center mb-10">Welcome to KosanIT</h1>

    <!-- Carousel Fasilitas -->
    <UCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'basis-full' }"
      class="rounded-lg overflow-hidden w-[90%] h-fit lg:h-[600px]"
      arrows
      indicators
    >
      <img :src="item" class="w-full" draggable="false" />
    </UCarousel>

    <!-- Rules -->
    <section
      class="mt-10 w-[90%] max-w-screen-lg flex flex-col items-center rounded-md p-5 shadow-lg"
    >
      <h2 class="text-3xl font-semibold mb-5">Aturan Kosan dan Peringatan</h2>
      <ul class="list-disc pl-5 space-y-3 text-lg">
        <li>Jaga kebersihan lingkungan kosan, terutama di area bersama.</li>
        <li>Dilarang berisik setelah jam 10 malam.</li>
        <li>Hindari mengganggu tetangga setelah jam tenang.</li>
        <li>Gunakan fasilitas bersama dengan bijak dan tanggung jawab.</li>
        <li>
          Laporkan segala masalah atau kerusakan pada manajemen kosan
          secepatnya.
        </li>
        <li>
          Perhatikan keamanan kosan dan jangan memberi akses kepada orang asing
          tanpa izin.
        </li>
        <li>Jaga privasi dan keamanan barang-barang pribadi.</li>
        <li>Patuhilah peraturan yang ada di lingkungan kosan.</li>
        <li>
          Hindari tindakan yang mengganggu ketertiban atau merusak fasilitas
          kosan.
        </li>
      </ul>
      <p class="mt-5 text-lg">
        Kegagalan dalam mematuhi peraturan ini dapat menyebabkan sanksi atau
        bahkan pengusiran dari kosan.
      </p>
    </section>
  </main>
  <Footer />
</template>
