import {Sequelize, JSON} from 'sequelize';

const sq = new Sequelize('sqlite://./db.sqlite', {
  define: {
    timestamps: true,
  },
  logging: false,
});

const qi = sq.getQueryInterface();

(async () => {
  const desc = await qi.describeTable('bots');
  console.log(desc);
  if (!desc.data) {
    console.log('Add data column');
    qi.addColumn('bots', 'data', {type: JSON});
  }
})();
