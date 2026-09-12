/**
 * Component Generator
 */

/* eslint strict: ["off"] */
const { readdirSync, lstatSync } = require('fs');
const path = require('path');
const { zodToJsonSchema } = require('zod-to-json-schema');
const basePrompts = require('../utils/base-prompts');
// const transformForSequelizeModel = require('../utils/data-transform');

const basePath = path.join(__dirname, '../../../libs/mx-schema/src/lib');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    ...basePrompts,
    {
      type: 'list',
      name: 'generator',
      message: 'What do you want to generate',
      choices: ['crud', 'crud-with-file-upload', 'crud-api-only'],
    },
  ],
  actions: (data) => {
    const files = readdirSync(basePath, { recursive: true });
    let schemaDefinition;
    for (const file of files) {
      if (lstatSync(`${basePath}/${file}`).isFile()) {
        const j = require('jiti')(__filename);
        const zodSchema = j(`${basePath}/${file}`)[data.zodSchema];
        if (zodSchema) {
          const jsonSchema = zodToJsonSchema(zodSchema, data.zodSchema);
          schemaDefinition = jsonSchema.definitions[data.zodSchema];
        }
      }
    }

    if (!schemaDefinition) {
      // schemaDefinition = transformForSequelizeModel(schemaDefinition);
      console.log(schemaDefinition, 'sd');
      console.error(`No Schema with name ${data.zodSchema}`);
      return;
    }

    const actions = [
      //get all list api
      {
        type: 'add',
        path: '../../apps/api/src/routes/v1/{{name}}/get-all-{{name}}s.api.ts',
        templateFile: './components/express/get-all-list.api.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // create api
      {
        type: 'add',
        path: '../../apps/api/src/routes/v1/{{name}}/create-{{name}}.api.ts',
        templateFile: './components/express/create.api.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      //delete api
      {
        type: 'add',
        path: '../../apps/api/src/routes/v1/{{name}}/id/delete-{{name}}.api.ts',
        templateFile: './components/express/id/delete.api.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      //get by id api
      {
        type: 'add',
        path: '../../apps/api/src/routes/v1/{{name}}/id/get-{{name}}.api.ts',
        templateFile: './components/express/id/get.api.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // update api

      {
        type: 'add',
        path: '../../apps/api/src/routes/v1/{{name}}/id/update-{{name}}.api.ts',
        templateFile: './components/express/id/update.api.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // Modify api routing file
      {
        type: 'modify',
        path: '../../apps/api/src/routes/v1/router.ts',
        pattern: /(\/\/ APPEND API ROUTES)/g,
        templateFile: './components/express/router.ts.hbs',
      },
      {
        type: 'modify',
        path: '../../apps/api/src/routes/v1/router.ts',
        pattern: /(\/\/ IMPORT GENERATED FILES)/g,
        templateFile: './components/express/import-routes.ts.hbs',
      },
      // angular module file
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/{{name}}.module.ts',
        templateFile: './components/angular/module.ts.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // angular routing file
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/{{name}}-routing.module.ts',
        templateFile: './components/angular/routing.ts.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // List component
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/{{name}}-list/{{name}}-list.component.ts',
        templateFile: './components/angular/list.ts.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // Form component HTML
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/modify-{{name}}/{{name}}-form/{{name}}-form.component.html',
        templateFile: './components/angular/form/form.html.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // Form component TS
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/modify-{{name}}/{{name}}-form/{{name}}-form.component.ts',
        templateFile: './components/angular/form/form.ts.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // Create form component
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/modify-{{name}}/create-{{name}}.component.ts',
        templateFile: './components/angular/form/add-form.ts.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // Edit form component
      {
        type: 'add',
        path: '../../apps/admin/src/app/features/{{name}}/modify-{{name}}/update-{{name}}.component.ts',
        templateFile: './components/angular/form/edit-form.ts.hbs',
        skipIfExists: true,
        data: { schemaValue: schemaDefinition },
      },
      // modify routing file
      {
        type: 'modify',
        path: '../../apps/admin/src/app/app-routing.module.ts',
        pattern: /(\/\/ APPEND ANGULAR ROUTES)/g,
        templateFile: './components/angular/append-route.ts.hbs',
      },
    ];

    return actions;
  },
};
