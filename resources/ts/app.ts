import { createApp, h } from "vue"
import { App, plugin as inertiaPlugin, Link, Head } from "@inertiajs/inertia-vue3"

import '../css/app.css'

const el = document.getElementById("app")!

createApp({
    render: () =>
        h(App, {
            initialPage: JSON.parse(el.dataset.page!),
            resolveComponent: async (name: string) => {
                return (await import(`./Pages/${name}.vue`)).default
            },
        }),
})
    .use(inertiaPlugin)
    .component('InertiaHead', Head)
    .component('InertiaLink', Link)
    .mount(el)
