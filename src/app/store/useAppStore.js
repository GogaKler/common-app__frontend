import { defineStore } from 'pinia';

export const useAppStore = defineStore('initialize', {
    state: () => ({
        userTheme: 'light',
        htmlElement: document.documentElement
    }),
    getters: {
        isDarkTheme: (state) => state.userTheme === 'dark'
    },
    actions: {
        initialTheme() {
            const theme = localStorage.getItem('theme');

            switch (theme) {
                case 'dark':
                    this.htmlElement.setAttribute('class', 'theme--dark');
                    this.userTheme = theme;
                    break;
                case 'light':
                    this.htmlElement.setAttribute('class', 'theme--light');
                    this.userTheme = theme;
                    break;
                default:
                    this.htmlElement.setAttribute('class', 'theme--light');
                    this.userTheme = 'light';
                    break;
            }
        },
        setTheme(value) {
            localStorage.setItem('theme', value);
            this.htmlElement.setAttribute('class', `theme--${value}`);
        }
    }
});
