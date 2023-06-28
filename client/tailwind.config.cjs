/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'fasthand': ['"Fasthand"', 'cursive']
		},
		extend: {},
	},
	plugins: [],
}