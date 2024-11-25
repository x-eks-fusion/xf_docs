import { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

// 插件
import vuetify from './plugin/vuetify';

import 'virtual:uno.css'

// 覆盖原有样式
import './assets/index.css';

const mainTheme: Theme = {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(vuetify);
    },
};

// export default DefaultTheme;
export default mainTheme;