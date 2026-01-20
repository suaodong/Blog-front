<script setup lang="ts">
import Header from './components/Header.vue';
import particlesConfig from './assets/particles-config.json';
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-[#C7EDCC] dark:bg-brand-dark font-sans text-gray-900 dark:text-white transition-colors duration-300">
    <!-- Particles Background -->
    <vue-particles
      id="tsparticles"
      :options="particlesConfig"
      class="absolute inset-0 z-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300"
    />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
