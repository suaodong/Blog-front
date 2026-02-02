<script setup lang="ts">
import Header from './components/Header.vue';
import particlesConfig from './assets/particles-config.json';
</script>

<template>
  <div class="relative min-h-screen overflow-hidden transition-colors duration-300 bg-(--app-bg) text-(--text)">
    <!-- Particles Background -->
    <vue-particles
      id="tsparticles"
      :options="particlesConfig"
      class="absolute inset-0 z-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300"
    />

    <!-- Ambient overlay (gives depth without fighting content) -->
    <div
      aria-hidden="true"
      class="absolute inset-0 z-0 pointer-events-none"
    >
      <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-60 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_65%)]"></div>
      <div class="absolute -bottom-28 -right-28 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-55 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent-2)_30%,transparent),transparent_66%)]"></div>
      <div class="absolute inset-0 opacity-40 dark:opacity-25 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--panel)_35%,transparent),transparent_40%,color-mix(in_oklab,var(--panel)_25%,transparent))]"></div>
    </div>

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
