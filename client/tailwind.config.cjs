/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',"./node_modules/flowbite/**/*.js"],
	theme: {
		fontFamily: {
			'fasthand': ['"Fasthand"', 'cursive'],
			'small-caps': ['"Alegreya Sans SC"', 'cursive'],
		},
		extend: {},
	},
	plugins: [
		require('flowbite/plugin')
	],
}
