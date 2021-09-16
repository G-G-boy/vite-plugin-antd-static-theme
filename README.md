# vite-plugin-antd-static-theme

根据 umi 插件 [umi-plugin-antd-theme](https://github.com/chenshuai2144/umi-plugin-antd-theme) 修改的 vite 插件

## install

```shell
npm i vite-plugin-antd-static-theme -D # yarn add vite-plugin-antd-static-theme -D
```

## demo

```ts
//vite.config.ts
import {defineConfig} from 'vite';
import ViteAntdTheme from 'vite-plugin-antd-static-theme';

export default defineConfig(() => ({
  plugins: [viteAntdTheme(options)],
}));
```

```json5
//options
{
  theme: [
    {
      theme: 'dark',
      fileName: 'dark.css',
    },
    {
      fileName: 'mingQing.css',
      modifyVars: {
        '@primary-color': '#13C2C2',
      },
    },
  ],
  // 是否压缩css
  min: true,
  // css module
  isModule: true,
  // 忽略 antd 的依赖
  ignoreAntd: false,
  // 忽略 pro-layout
  ignoreProLayout: false,
  // 不使用缓存
  cache: true,
}
```

可以通过 window.vite_plugin_ant_themeVar 获取 theme

```ts
//获取ts提示
declare interface Window {
  vite_plugin_ant_themeVar: {
    key?: string;
    theme?: string;
    fileName?: string;
    modifyVars?: Record<string, string>;
  }[];
}
```

### [点我跳到示例代码](https://github.com/G-G-boy/vite-react-ts-demo)
