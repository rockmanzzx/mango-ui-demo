import {createI18n} from 'vue-i18n';

import en from './en.json'
import zh from './zh.json'

const savedLanguage = localStorage.getItem('language') || 'zh'

const i18n = createI18n({
    legacy: false,
    locale: savedLanguage,
    messages: {
        en,
        zh
    }
})

export default i18n