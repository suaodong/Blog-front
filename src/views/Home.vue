<script setup lang="ts">
import particlesConfig from '../assets/particles-config.json';
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
     <!-- Particles Background is in App.vue, but we can have local content here -->
      <h1 class="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6 animate-fade-in-up">
        Welcome to AntiGravity
      </h1>
      <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
        Explore the universe of code, design, and innovation. A personal blog built for the future.
      </p>
      <div class="flex space-x-4 animate-fade-in-up delay-200">
        <router-link to="/articles/2" class="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
          Read Articles
        </router-link>
        <button class="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
          View Projects
        </button>
      </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0; /* Start hidden */
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
