import * as translations from "./translations"

class I18n {
    constructor(services, config = {}) {
        this.services = services;
        this.config = config;
        this.listeners = [];
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        }
    }

    getLocale() {
        return this.config.locale
    }

    setLocale(locale) {
        this.services.api.defaultHeaders = {
            ...this.services.api.defaultHeaders,
            'X-Lang': this.config.locale,
        }
        this.config = {
            ...this.config,
            locale,
        }
        for (const listener of this.listeners) listener(this.config.locale);
    }

    translate(text, plural, locale = this.config.locale) {
        let result = translations[locale] && (text in translations[locale])
            ? translations[locale][text]
            : text
        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(locale).select(plural)
            if (key in result) {
                result = result[key]
            }
        }
        return result
    }
}

export default I18n;