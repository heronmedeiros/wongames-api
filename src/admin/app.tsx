// export default {
//   config: {
//     locales: [
//       // 'ar',
//       // 'fr',
//       // 'cs',
//       // 'de',
//       // 'dk',
//       // 'es',
//       // 'he',
//       // 'id',
//       // 'it',
//       // 'ja',
//       // 'ko',
//       // 'ms',
//       // 'nl',
//       // 'no',
//       // 'pl',
//       // 'pt-BR',
//       // 'pt',
//       // 'ru',
//       // 'sk',
//       // 'sv',
//       // 'th',
//       // 'tr',
//       // 'uk',
//       // 'vi',
//       // 'zh-Hans',
//       // 'zh',
//     ],
//   },
//   bootstrap(app) {
//     console.log(app);
//   },
// };
import Icon from './extensions/icon.png';
import Logo from './extensions/logo.svg';

export default {
  config: {
    auth: {
      logo: Logo,
    },
    head: {
      favicon: Icon,
    },
    locales: [],
    menu: {
      logo: Icon,
    },
    // Extend the translations
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to Won Games',
        'Auth.form.welcome.subtitle': 'Login to your account',
        'app.components.LeftMenu.navbrand.title': 'Won Game Dashboard',
      },
    },
    theme: {
      light: {},
      dark: {
        colors: {
          primary100: "#030415",
          primary600: "#f231a5",
          primary700: "#f231a5",
          neutral0: "#0d102f",
          neutral100: "#030415",
        },
      },
    },
  },

  bootstrap() {},
};