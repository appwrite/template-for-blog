import { browser } from '$app/environment';

type Theme = 'auto' | 'dark' | 'light';
const THEME_STORAGE_KEY = 'theme-preference';
const SYSTEM_DARK_THEME_QUERY = '(prefers-color-scheme: dark)' as const;

const THEME_COLOR_QUERY = 'meta[name="theme-color"]' as const;
const APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE =
	'meta[name="apple-mobile-web-app-status-bar-style"]' as const;

let isDarkTheme = $state(false);
let initialized = $state(false);

function getSystemTheme(): Theme {
	if (!browser) return 'light';
	return window.matchMedia(SYSTEM_DARK_THEME_QUERY).matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
	if (!browser) return 'light';
	return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) ?? 'light';
}

function storeTheme(theme: Theme) {
	if (!browser) return;
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function setupThemeListener() {
	if (!browser) return;

	const mediaQuery = window.matchMedia(SYSTEM_DARK_THEME_QUERY);
	mediaQuery.addEventListener('change', (e) => {
		const storedTheme = getStoredTheme();
		if (storedTheme === 'auto') {
			isDarkTheme = e.matches;
			applyTheme(isDarkTheme);
		}
	});
}

export const theme = {
	init: async () => {
		if (initialized) return;

		// First, init from localStorage
		const storedTheme = getStoredTheme();
		isDarkTheme = storedTheme === 'auto' ? getSystemTheme() === 'dark' : storedTheme === 'dark';

		applyTheme(isDarkTheme);
		setupThemeListener();
		initialized = true;
	},

	isDarkTheme: () => isDarkTheme,

	toggleTheme: async () => {
		const newTheme = isDarkTheme ? 'light' : 'dark';
		isDarkTheme = !isDarkTheme;
		storeTheme(newTheme);
		applyTheme(isDarkTheme, true);
	}
};

function applyTheme(isDark: boolean, applyTransition: boolean = false) {
	if (!browser) return;

	const applyThemeChange = () => {
		document.documentElement.classList.toggle('dark', isDark);

		const metaThemeColor = document.querySelector(THEME_COLOR_QUERY);
		const metaAppleStyle = document.querySelector(APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE);

		let color = '#fafafb';
		if (isDark) color = '#121212';
		if (metaThemeColor) metaThemeColor.setAttribute('content', color);
		if (metaAppleStyle) metaAppleStyle.setAttribute('content', color);
	};

	try {
		if (applyTransition && document.startViewTransition) {
			document.startViewTransition(applyThemeChange);
		} else {
			applyThemeChange();
		}
	} catch {
		applyThemeChange();
	}
}
