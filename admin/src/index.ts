import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'input-code-generator',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: getTranslation('input-code-generator.plugin.name'),
        defaultMessage: 'Input Code Generator',
      },
      intlDescription: {
        id: getTranslation('input-code-generator.plugin.description'),
        defaultMessage: 'Generates a code hexadecimal.',
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import('./components/InputCodeGenerator').then((module) => ({
            default: module.default,
          })),
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
