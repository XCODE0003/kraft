import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { createVfm } from 'vue-final-modal'
import { createPinia } from 'pinia'
import 'vue-final-modal/style.css'
import { useProductStore } from './Stores/ProductStore';


const vfm = createVfm()
const pinia = createPinia()

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        app.use(plugin)
            .use(vfm)
            .use(pinia)
            .use(ZiggyVue)

        return app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
