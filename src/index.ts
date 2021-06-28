import {Sequelize, JSON, INTEGER, STRING} from 'sequelize';

const sq = new Sequelize('sqlite://./db.sqlite', {
  define: {
    timestamps: true,
  },
  logging: false,
});

const qi = sq.getQueryInterface();

(async () => {
  const desc = await qi.describeTable('bots');
  if (!desc.data) {
    console.log('Add data column');
    qi.addColumn('bots', 'data', {type: JSON});
  }

  const schemas = (await qi.showAllSchemas()) as {name: string}[];
  console.log(schemas);
  if (schemas.filter(schema => schema.name === 'caches').length === 0) {
    console.log('add table caches');
    qi.createTable('caches', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: STRING,
      },
      value: {
        type: JSON,
      },
    });
  }
})();
