import { PLUGIN_ID } from './pluginId';
import { PluginIcon } from './components/PluginIcon';
import Input from './components/Input';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'strapi-code-generator',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: 'Strapi Code Generator',
      },
      icon: PluginIcon,
      components: {
        Input: Input,
      },
    });
  },
  bootstrap() {},
};
