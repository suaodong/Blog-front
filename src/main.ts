import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import router from './router';

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(Particles, {
    init: async (engine) => {
      await loadSlim(engine);
    },
  })
  .mount('#app')
