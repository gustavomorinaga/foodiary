const colors = require('./src/styles/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors,
			fontFamily: {
				'sans-regular': ['HostGrotesk_400Regular'],
				'sans-medium': ['HostGrotesk_500Medium'],
				'sans-semibold': ['HostGrotesk_600SemiBold'],
				'sans-bold': ['HostGrotesk_700Bold'],
			},
		},
	},
};
