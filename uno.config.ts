import {
    defineConfig,
    presetUno,
    // ico
    presetIcons,
    // presetAttributify,
    // presetTypography,
    // transformerDirectives,
    // transformerVariantGroup
} from 'unocss';

export default defineConfig({
    // 快捷预设样式
    shortcuts: [
    ],
    // theme: {
    //     colors: {
    //         // ...
    //     }
    // },
    presets: [
        presetUno(),
        // presetAttributify(),
        presetIcons(),
        // presetTypography(),
    ],
    // transformers: [
    //   transformerDirectives(),
    //   transformerVariantGroup(),
    // ],
});