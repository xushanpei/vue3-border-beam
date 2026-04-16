import type { App } from 'vue';
import BorderBeam from './components/BorderBeam.vue';

export default {
  install(app: App) {
    app.component('BorderBeam', BorderBeam);
  },
};
