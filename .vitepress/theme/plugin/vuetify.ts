import { aliases } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';

// css
import 'vuetify/styles';

const vuetify = createVuetify({
    icons: {
        // 使用 mdi 作为默认图标
        aliases,
    },
});

export default vuetify;