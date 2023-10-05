import treser from '@rollup/plugin-terser';

export default {
    input: 'index.js',
    external: ['buffer', 'exifr', 'coordinate-parser'],
    output: [
        {
            file: 'dist/bundle.min.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: 'dist/bundle.min.cjs',
            format: 'cjs',
            sourcemap: true
        }
    ],
    plugins: [treser()]
}