import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'input-code-generator',
    plugin: PLUGIN_ID,
    type: 'string',
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};

export default register;
