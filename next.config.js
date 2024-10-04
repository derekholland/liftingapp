// // next.config.js
// const path = require('path');

// module.exports = {
// 	reactStrictMode: true,
// 	swcMinify: true, // Use SWC to minify the JavaScript code

// 	// Handle environment variables
// 	env: {
// 		API_URL: process.env.API_URL, // Example: Using API URL
// 	},

// 	// Handle external image domains
// 	images: {
// 		domains: ['example.com', 'cdn.example.com'],
// 	},

// 	// Enable Sass options if using SCSS/Sass
// 	sassOptions: {
// 		includePaths: [path.join(__dirname, 'styles')],
// 	},

// 	// Enable output tracing for serverless functions
// 	output: 'standalone',

// 	// Custom webpack configuration
// 	webpack: (config, { isServer }) => {
// 		if (!isServer) {
// 			config.resolve.fallback = {
// 				fs: false, // Fix for "fs" module not found error
// 			};
// 		}
// 		return config;
// 	},

// 	// Enable future features
// 	future: {
// 		webpack5: true,
// 	},
// };

module.exports = {
	reactStrictMode: true, // Enables strict mode for React

	// Disable caching globally for all routes and API endpoints
	async headers() {
		return [
			{
				source: '/(.*)', // Match all routes
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-store, no-cache, must-revalidate, proxy-revalidate', // Disable caching
					},
				],
			},
		];
	},
};
