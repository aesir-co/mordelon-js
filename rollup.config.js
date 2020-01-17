import typescript from 'rollup-plugin-typescript2'
import { terser } from "rollup-plugin-terser";
import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            extend: true,
            name: 'Mordelon'
        },
        {
            file: pkg.minify,
            format: 'umd',
            extend: true,
            name: 'Mordelon',
            plugins: [terser()]
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    onwarn: function(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
            return;
        }
        warn(warning);
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
            typescript: require('typescript'),
        }),
    ],
}