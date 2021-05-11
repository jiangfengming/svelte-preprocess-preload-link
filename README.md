# svelte-preprocess-preload-link
Generate preload `<link>` tags in `<svelte:head>`.

## Usage
1. Vite config file

```js
import fs from 'fs';
import svelte from '@sveltejs/vite-plugin-svelte';
import preloadLink from 'svelte-preprocess-preload-link';

export default ({ command }) => {
  const isDev = command === 'serve';
  const isBuildSSR = process.argv.includes('--ssr');

  const preprocess = [
    // your preprocessors
  ];

  if (isBuildSSR) {
    const manifest = JSON.parse(fs.readFileSync('dist/client/ssr-manifest.json', 'utf-8'));
    preprocess.push(preloadLink({ manifest }));
  }

  return {
    // ... other configs

    plugins: [
      svelte({
        hot: isDev,
        preprocess,

        compilerOptions: {
          hydratable: true
        }
      })
    ]
  };
};
```

2. Build scripts

```json
{
  "scripts": {
    "build:client": "vite build --outDir dist/client --ssrManifest",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```


3. Run

```sh
# build client first to generate ssr-manifest.json
npm run build:client
npm run build:server
``` 
