# vite-plugin-antd-static-theme
根据umi插件umi-plugin-antd-theme修改的vite插件

## install
```shell
npm i vite-plugin-antd-static-theme -D # yarn add vite-plugin-antd-static-theme -D
```

## demo
```ts
//vite.config.ts
import { defineConfig } from 'vite';
import ViteAntdTheme from 'vite-plugin-antd-static-theme';

export default defineConfig(() => ({
    plugins:[
        viteAntdTheme(options)
    ]
}))
```
