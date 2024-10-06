import console from "node:console";
import { exit } from "node:process";

import { analyzeMetafile, build } from "esbuild";

try {
    const { metafile } = await build({
        entryPoints: {
            main: "src/main.ts",
        },
        outdir: "dist",
        outExtension: {
            ".js": ".mjs",
        },

        format: "esm",
        platform: "node",
        target: "node20",

        metafile: true,
        external: [],
        packages: "bundle",
        bundle: true,
        minify: true,
        keepNames: false,
        sourcemap: true,

        define: {
            "process.env.NODE_ENV": '"production"',
        },
        banner: {
            js: `
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
`,
        },
    });

    if (metafile) {
        const result = await analyzeMetafile(metafile);
        console.log(result);
    }
    exit(0);
} catch (error) {
    console.error(error);
    exit(1);
}
