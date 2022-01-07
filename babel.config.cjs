/* eslint-env node */
module.exports = {
    env: {
        test: {
            // "plugins": [["@babel/transform-runtime"]]
            plugins: [
                function () {
                    return {
                        visitor: {
                            MetaProperty(path) {
                                path.replaceWithSourceString('process');
                            },
                        },
                    };
                },
            ],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'entry',
                        corejs: '2',
                        targets: {
                            node: 'current',
                            esmodules: true,
                        },
                    },
                ],
            ],
        },
    },
};
