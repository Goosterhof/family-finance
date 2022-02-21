import {visualizer} from 'rollup-plugin-visualizer';
import {Options} from '@vitejs/plugin-vue';
import {NodeTransform} from '@vue/compiler-core';
import copy from 'rollup-plugin-copy';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const srcPath = path.resolve('./resources/js');

const resolve = {
    alias: {
        components: path.join(srcPath, 'components'),
        icons: path.join(srcPath, 'icons'),
        pages: path.join(srcPath, 'pages'),
        router: path.join(srcPath, 'router'),
        modules: path.join(srcPath, 'modules'),
        layouts: path.join(srcPath, 'layouts'),

        helpers: path.join(srcPath, 'helpers'),
        services: path.join(srcPath, 'services'),
        types: path.join(srcPath, 'types'),
    },
};

const testAttributes = ['data-test-id', 'data-test-class'];

const testNodeTransformer: NodeTransform = node => {
    if (node.type !== 1 /** NodeTypes.ELEMENT  */) return;
    for (let index = 0; index < node.props.length; index++) {
        const {type, name} = node.props[index];
        if (type === 6 /** NodeTypes.ATTRIBUTE */ && testAttributes.includes(name)) {
            node.props.splice(index, 1);
            index--;
        }
    }
};

const plugins = [
    copy({
        targets: [
            {src: 'resources/img', dest: 'public/images'},
            {src: 'resources/fonts', dest: 'public/fonts'},
        ],
        hook: 'writeBundle',
    }),
];

export default ({command}) => {
    const production = command !== 'serve';

    const vueOptions: Options = {};

    if (production) {
        vueOptions.template = {compilerOptions: {nodeTransforms: [testNodeTransformer]}};
    }

    plugins.push(vue(vueOptions));

    // Generates stats.html file with the bundle stats handy for reducing the main bundle size
    if (production) plugins.push(visualizer({}));

    return {
        base: production ? '/js/' : '',
        build: {
            assetsInclude: [],
            manifest: true,
            outDir: 'public/js',
            rollupOptions: {
                input: 'resources/js/main.ts',
            },
        },
        plugins,
        server: {port: 3000},

        // Vite bugs if you build out dir is inside the public dir so we change that to something else
        publicDir: 'random_non_existent_folder',
        resolve,
    };
};
