// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild');


const isProduction = process.env.NODE_ENV === 'production';
const watch = process.env.WATCH === 'true';
const server = process.env.SERVER === 'true';

const buildConfig = {
    entryPoints: ['src/index.tsx'],
    bundle     : true,
    watch, // Watch and server cannot be true in the same time
    minify     : isProduction,
    sourcemap  : !isProduction,
    target     : ['chrome58', 'firefox57', 'safari11', 'edge18'],
    outdir     : 'dist',
};

if(server){
    esbuild.serve({
        port    : 3030,
        servedir: 'dist',
    }, buildConfig);
} else {
    esbuild.build(buildConfig);
}
