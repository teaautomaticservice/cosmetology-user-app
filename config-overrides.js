const path = require('path');

module.exports = (config, env) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@ant": path.resolve(__dirname, './src/ant'),
			"@apiMethods": path.resolve(__dirname, './src/apiMethods'),
			"@assets": path.resolve(__dirname, './src/assets'),
			"@components": path.resolve(__dirname, './src/components'),
			"@hooks": path.resolve(__dirname, './src/hooks'),
			"@router": path.resolve(__dirname, './src/router'),
			"@stores": path.resolve(__dirname, './src/stores'),
			"@typings": path.resolve(__dirname, './src/typings'),
			"@utils": path.resolve(__dirname, './src/utils'),
			"@shared": path.resolve(__dirname, './src/libs/shared/src'),
		}

		return config;
	}