module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		mode: 'all',
		enable: true,
		content: ['src/**/*.tsx'],
	},
	darkMode: 'media',
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
};
