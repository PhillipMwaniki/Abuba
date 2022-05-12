export const translations = {
    methods: {
        __(key: string) {
            let translation = window._translations[key] || key;
            return translation;
        }
    }
}
