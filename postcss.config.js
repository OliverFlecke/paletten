module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nesting'),
		require('tailwindcss'),
		require('autoprefixer'),
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		// require('@fullhuman/postcss-purgecss')({
		// 	content: ['./src/**/*.[jt]?sx', './src/**/*.html'],
		// }),
	],
};
