import type { Plugin, ResolvedConfig } from 'vite';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import  rimraf from 'rimraf';
import defaultTheme from './defaultTheme';
import  serveStatic from 'serve-static';

const buildCss = require('antd-pro-merge-less');
const winPath = require('slash2');

const ViteAntdStaticTheme = (): Plugin => {
    let config: ResolvedConfig;
    return {
        name: 'vite-plugin-antd-static-theme',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        configureServer(server) {
            return () => {
                const themeTemp = winPath(join(process.cwd(), 'node_modules', '.plugin-theme'));
                console.log(`cache in :${themeTemp}`);
                console.log('💄  build theme');
                // 建立相关的临时文件夹
                try {
                    if (existsSync(themeTemp)) {
                        rimraf.sync(themeTemp);
                    }
                    if (existsSync(winPath(join(themeTemp, 'theme')))) {
                        rimraf.sync(winPath(join(themeTemp, 'theme')));
                    }

                    mkdirSync(themeTemp);

                    mkdirSync(winPath(join(themeTemp, 'theme')));
                } catch (error) {
                    console.log('dev error:', error);
                }

                server.middlewares.use(serveStatic(themeTemp));

                buildCss(
                    process.cwd(),
                    defaultTheme.theme.map((theme) => ({
                        ...theme,
                        fileName: winPath(join(themeTemp, 'theme', theme.fileName)),
                    })),
                    {
                        // 是否压缩css
                        min: false,
                        // css module
                        isModule: false,
                        // 忽略 antd 的依赖,用于打包 antd 自己的依赖
                        ignoreAntd: false,
                        // 忽略 pro-layout 的依赖
                        ignoreProLayout: true,
                        // 不使用缓存
                        cache: false,
                    },
                )
                    .then(() => {
                        console.log('🎊  build theme success');
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            };
        },
        transformIndexHtml(html, ctx) {
            return {
                html,
                tags: [
                    {
                        tag: 'script',
                        children: `window.vite_plugin_ant_themeVar = ${JSON.stringify(
                            defaultTheme.theme,
                        )}`,
                        injectTo: 'head',
                    },
                ],
            };
        },
        generateBundle() {
            console.log('build theme');
            const { outDir } = config.build;
            const outputPath = join(process.cwd(), outDir);
            const themePath = winPath(join(outputPath, 'theme'));
            try {
                if (existsSync(themePath)) {
                    rimraf.sync(themePath);
                }
                mkdirSync(themePath);
            } catch (error) {
                console.log(error);
            }

            buildCss(
                process.cwd(),
                defaultTheme.theme.map((theme) => ({
                    ...theme,
                    fileName: winPath(join(outputPath, 'theme', theme.fileName)),
                })),
                {
                    // 是否压缩css
                    min: false,
                    // css module
                    isModule: false,
                    // 忽略 antd 的依赖,用于打包 antd 自己的依赖
                    ignoreAntd: false,
                    // 忽略 pro-layout 的依赖
                    ignoreProLayout: true,
                    // 不使用缓存
                    cache: false,
                },
            )
                .then(() => {
                    console.log('🎊  build theme success');
                })
                .catch((err: any) => {
                    console.log(err);
                });
        },
    };
};

export default ViteAntdStaticTheme;
