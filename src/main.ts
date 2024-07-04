import { createApp } from 'vue'
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import '@mdi/font/css/materialdesignicons.css'; // Ensure you import the Material Design Icons CSS

import App from './App.vue'
import router from './router'
import { surveyCreatorPlugin } from "survey-creator-vue";
import { surveyPlugin } from 'survey-vue3-ui';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './index.css'
import Clipboard from 'v-clipboard'
import { VueRecaptchaPlugin } from 'vue-recaptcha'
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App);
app.config.globalProperties.$toastr = toastr;
app.use(VueRecaptchaPlugin, {
  v2SiteKey:import.meta.env.VITE_SITE_KEY,
  v3SiteKey:import.meta.env.VITE_SITE3_KEY
})
app.use(Clipboard);
app.use(surveyPlugin)
app.use(surveyCreatorPlugin).use(router);
app.use(vuetify);
app.mount('#app')
