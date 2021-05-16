// next.config.js
const withAntdLess = require('next-plugin-antd-less');
const overrides = require('./styles/variables.js');

const { getThemeVariables } = require('antd/dist/theme');

let themeVariables = { ...getThemeVariables({ dark: true }), ...overrides };


module.exports = withAntdLess({
    // optional
    modifyVars: themeVariables,
    // optional
    lessVarsFilePath: './styles/variables.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {
    },

    // Other Config Here...

    webpack(config) {
        return config;
    },

    future: {
        // if you use webpack5
        webpack5: true,
    },
});