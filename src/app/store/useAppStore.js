import { defineStore } from 'pinia';
import { useBreakpoint } from '@shared/utils/useBreakpoint';

export const useAppStore = defineStore('app', {
    state: () => ({
        userTheme: 'light',
        switchThemeValue: false,
        htmlElement: document.documentElement,
        breakpoints: useBreakpoint(),
        mobileBreakpoints: ['sm', 'xs', 'md']
    }),
    getters: {
        isDarkTheme: (state) => state.userTheme === 'dark',
        isMobile: (state) => state.mobileBreakpoints.includes(state.breakpoints.is)
    },
    actions: {
        initialTheme() {
            const theme = localStorage.getItem('theme');

            switch (theme) {
                case 'dark':
                    this.htmlElement.setAttribute('class', 'theme--dark');
                    this.userTheme = theme;
                    this.switchThemeValue = true;
                    break;
                case 'light':
                    this.htmlElement.setAttribute('class', 'theme--light');
                    this.userTheme = theme;
                    this.switchThemeValue = false;
                    break;
                default:
                    this.htmlElement.setAttribute('class', 'theme--light');
                    this.userTheme = 'light';
                    this.switchThemeValue = false;
                    break;
            }
        },
        setTheme(value) {
            switch (value) {
                case 'light':
                    this.switchThemeValue = false;
                    break;
                case 'dark':
                    this.switchThemeValue = true;
                    break;
            }
            localStorage.setItem('theme', value);
            this.htmlElement.setAttribute('class', `theme--${value}`);
        }
    }
});
