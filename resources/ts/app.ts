import { createApp, h } from "vue"
import { createInertiaApp } from "@inertiajs/inertia-vue3"
// import "vite/dynamic-import-polyfill"

const el = document.getElementById("app");

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.vue')

        return (await pages[`./Pages/${name}.value`]()).default;
    },
    setup({ el, app, props, plugin}) {
        createApp({render: () => h(app, props)})
            .use(plugin)
            .mount(el)
    },
})
