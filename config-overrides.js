const path = require('path');
const rewriteLoader = require('./utils/rewriteLoader');

module.exports = (config, env) => {
		rewriteLoader(config.module?.rules ?? [], (item, entityKey) => {
      const rule = item[entityKey];

      // Check if this rule targets SVG files
      if (entityKey === 'test' && rule?.toString().includes('svg')) {
        item.use = ['@svgr/webpack'];
        item.issuer = /\.(js|ts)x?$/;
      }
    });

		config.resolve.alias = {
			...config.resolve.alias,
			"@ant": path.resolve(__dirname, './src/ant'),
			"@apiMethods": path.resolve(__dirname, './src/apiMethods'),
			"@assets": path.resolve(__dirname, './src/assets'),
			"@components": path.resolve(__dirname, './src/components'),
			"@hooks": path.resolve(__dirname, './src/hooks'),
			"@hocs": path.resolve(__dirname, './src/hocs'),
			"@router": path.resolve(__dirname, './src/router'),
			"@stores": path.resolve(__dirname, './src/stores'),
			"@typings": path.resolve(__dirname, './src/typings'),
			"@utils": path.resolve(__dirname, './src/utils'),
			"@constants": path.resolve(__dirname, './src/constants'),
			"@shared": path.resolve(__dirname, './src/libs/shared/src'),
			"@svg": path.resolve(__dirname, './src/components/ui/svg/svg.ts'),
		}

		return config;
	}