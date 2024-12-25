import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/index.js'
import { createVfm } from 'vue-final-modal'
import { createPinia } from 'pinia'
import 'vue-final-modal/style.css'

const vfm = createVfm()
const pinia = createPinia()

const appName = 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            const app = createSSRApp({
                render: () => h(App, props),
            })

            app.use(plugin)
                .use(vfm)
                .use(pinia)
                .use(ZiggyVue)
                .use(PrimeVue)
                .directive('tooltip', Tooltip)

            return app
        },
    }),
)