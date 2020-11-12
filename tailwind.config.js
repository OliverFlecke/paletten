module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: false,
	theme: {
		extend: {
			screens: {
				dark: { raw: '(prefers-color-scheme: dark)' },
			},
		},
	},
	variants: {},
	plugins: [],
};
