'use strict';

import Input from './admin/src/components/Input';

module.exports = {
  register({ app }: { app: any }) {
    app.customFields.register({
      name: 'strapi-code-generator',
      plugin: 'strapi-code-generator',
      type: 'string',
      intlLabel: {
        id: 'strapi-code-generator.label',
        defaultMessage: 'Strapi Code Generator',
      },
      intlDescription: {
        id: 'strapi-code-generator.description',
        defaultMessage: 'Generate and copy a 6-char hex code',
      },
      components: {
        Input: Input,
      },
    });
  },
  bootstrap() {},
};
