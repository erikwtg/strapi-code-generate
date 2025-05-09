import { PLUGIN_ID } from './pluginId';
import { PluginIcon } from './components/PluginIcon';
// import { prefixPluginTranslations } from '@strapi/helper-plugin';
// import { getTranslation } from './utils/getTranslation';
import Input from './components/Input';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'strapi-code-generator',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      icon: PluginIcon,
      components: {
        Input: Input,
      },
    });
  },

  bootstrap() {},

  // async registerTrads({ locales }: { locales: string[] }) {
  //   return Promise.all(
  //     locales.map(async (locale) => {
  //       try {
  //         const { default: data } = await import(`./translations/${locale}.json`);

  //         // return { data: prefixPluginTranslations(data, PLUGIN_ID), locale };
  //         return { data: {}, locale };
  //       } catch {
  //         return { data: {}, locale };
  //       }
  //     })
  //   );
  // },
};
