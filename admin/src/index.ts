import { PLUGIN_ID } from './pluginId';
import { PluginIcon } from './components/PluginIcon';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { getTranslation } from './utils/getTranslation';

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
        Input: async () => import('./components/Input'),
      },
      options: {
        // base: [
        //   {
        //     intlLabel: {
        //       id: getTranslation('form.field.codeFormat'),
        //       defaultMessage: 'Code Format',
        //     },
        //     name: 'options.code-format',
        //     type: 'text',
        //   },
        //   {
        //     sectionTitle: {
        //       id: getTranslation('form.field.options'),
        //       defaultMessage: 'Options',
        //     },
        //     items: [
        //       {
        //         intlLabel: {
        //           id: getTranslation('form.field.disableAutoFill'),
        //           defaultMessage: 'Disable Auto Fill',
        //         },
        //         name: 'options.disable-auto-fill',
        //         type: 'checkbox',
        //         description: {
        //           id: 'form.field.disableAutoFill.description',
        //           defaultMessage:
        //             'Disable initial auto fill of the UUID. UUID field will be editable when this option is enabled.',
        //         },
        //       },
        //       {
        //         intlLabel: {
        //           id: getTranslation('form.field.disableRegenerate'),
        //           defaultMessage: 'Disable Regenerate',
        //         },
        //         name: 'options.disable-regenerate',
        //         type: 'checkbox',
        //         description: {
        //           id: 'form.field.disableRegenerate.description',
        //           defaultMessage: 'Disable regeneration in the UI',
        //         },
        //       },
        //     ],
        //   },
        // ],
        // advanced: [
        //   {
        //     sectionTitle: {
        //       id: 'global.settings',
        //       defaultMessage: 'Settings',
        //     },
        //     items: [
        //       {
        //         name: 'required',
        //         type: 'checkbox',
        //         intlLabel: {
        //           id: getTranslation('form.attribute.item.requiredField'),
        //           defaultMessage: 'Required field',
        //         },
        //         description: {
        //           id: getTranslation('form.attribute.item.requiredField.description'),
        //           defaultMessage: "You won't be able to create an entry if this field is empty",
        //         },
        //       },
        //       {
        //         name: 'private',
        //         type: 'checkbox',
        //         intlLabel: {
        //           id: 'form.attribute.item.privateField',
        //           defaultMessage: 'Private field',
        //         },
        //         description: {
        //           id: 'form.attribute.item.privateField.description',
        //           defaultMessage: 'This field will not show up in the API response',
        //         },
        //       },
        //     ],
        //   },
        // ],
      },
    });

    app.bootstrap(() => {
      console.log('bootstrap');
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data: prefixPluginTranslations(data, PLUGIN_ID), locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
