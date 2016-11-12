import translations from '../messages/translations.js';

const DEFAULT_LANG = 'en';

let currentLocale = DEFAULT_LANG;

export function setLanguage(lang) {
  currentLocale = lang;
}

export function getText(key, locale = currentLocale, params) {
	const localeTokens = locale.split('_');
	const translation = translations[key];
	let text = '--';

	if (translation) {
		text = translation[locale] || translation[localeTokens[0]];

    // Message wildcards subsitution
		if (params) {
			Object.keys(params).forEach(function(paramKey) {
				text = text.replace('{' + paramKey + '}', params[paramKey]);
			});
		}
	}

	return text;
}
