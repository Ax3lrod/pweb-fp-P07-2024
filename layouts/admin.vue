<template>
    <div>
      <nav>
        <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/admin/laporan/fasilitas">Laporan Fasilitas</NuxtLink>
        <NuxtLink to="/admin/laporan/penghuni">Laporan Penghuni</NuxtLink>
      </nav>
      <main>
        <slot />
      </main>
    </div>
  </template>
  