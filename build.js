// eslint-disable-next-line @typescript-eslint/no-var-requires
require('esbuild').buildSync({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
    outdir: 'dist',
})
