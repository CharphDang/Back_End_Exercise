(async () => {
  const Sequelize = require('sequelize');

  const sequelize = new Sequelize('kaikeba', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql'
  });

  // 测试连接是否成功
  //   sequelize
  //     .authenticate()
  //     .then(() => {
  //       console.log('Connection successful.');
  //     })
  //     .catch(() => {
  //       console.log('connection failed');
  //     });
  try {
    const connectionResult = await sequelize.authenticate();
    console.log('connectionResult 没有值，是undefined', connectionResult);
    console.log('走到这里，证明链接成功');
  } catch (error) {
    console.log('走到这里，证明链接失败', error);
  }

  //   定义模型
  const User = sequelize.define(
    'user',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        // findAll()查询的时候触发
        get() {
          const cname = this.getDataValue('name');
          const cage = this.getDataValue('age');
          return `${cname}(${cage})`;
        },
        // create、update、bulkCreate时候触发
        set(cname) {
          this.setDataValue('name', `cf_${cname}`);
        }
      },
      age: {
        type: Sequelize.INTEGER,
        validate: {
          min: { args: [0], msg: '年龄字段必须大于0' },
          max: { args: [100], msg: '年龄字段必须小于100' }
        }
      },
      myDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      sex: {
        type: Sequelize.STRING,
        defaultValue: 'man',
        validate: {
          // 自定义验证:
          isEven(value) {
            if (!['man', 'women'].includes(value)) {
              throw new Error('只能是男或者女');
              // 我们也在模型的上下文中，所以如果它存在的话,
              // this.otherField会得到otherField的值。
            }
          }
        }
      }
    },
    {
      timestamps: false,
      // 定义伪属性，数据库中不会存amount，通过模型实例触发
      getterMethods: {
        amount() {
          return this.getDataValue('age') + '岁';
        }
      },
      // 通过模型实例触发
      setterMethods: {
        amount(val) {
          const idx = val.indexOf('岁');
          const v = val.slice(0, idx);
          this.setDataValue('age', v);
        }
      }
    }
  );

  // 根据模型创建表
  await User.sync({
    force: true
  });

  // 增、
  //   await User.create({
  //     name: 'tom',
  //     age: 10
  //   });
  //   await User.create({
  //     name: 'jerry',
  //     age: 15,
  //     sex: 'renyao'
  //   });
  //   await User.create({
  //     name: 'haha',
  //     age: 170
  //   });
  // 批量新增
  await User.bulkCreate([
    {
      name: 'tom',
      age: 10
    },
    {
      name: 'jerry',
      age: 150
    },
    {
      name: 'haha',
      age: 8
    },
    {
      name: 'nongfushanquan',
      age: 8
    },
    {
      name: 'tiandi',
      sex: 'renyao'
    }
  ]);
  //   2秒后修改
  setTimeout(() => {
    User.update(
      {
        age: 20
      },
      { where: { name: 'tom' } }
    );
  }, 2000);
  // 删
  await User.destroy({ where: { age: 8 } });
  // 查
  const all = await User.findAll();

  all[0].amount = '100岁';
  all[0].save();

  console.log(all[1].amount);
  // 使用build，当save的时候才入库
  const user = User.build({
    name: '小红',
    age: '18'
  });
  await user.save();

  user.age = 20;
  await user.save();

  user.destroy();
  console.log(JSON.stringify(all));
})();
