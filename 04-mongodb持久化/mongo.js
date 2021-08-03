(async () => {
  const { MongoClient: MongoDb } = require('mongodb');
  const url = 'mongodb://localhost:27017';

  const dbName = 'test';

  const client = new MongoDb(url, {
    useNewUrlParser: true
  });

  await client.connect();

  const db = client.db(dbName);
  const studentsColl = db.collection('students');

  await studentsColl.insertMany([
    {
      name: 'dangchaofeng',
      age: 20,
      other: { some: { height: 175 } }
    },
    {
      name: 'dangchaofeng',
      age: 20,
      other: { some: { width: 40 } }
    }
  ]);

  await studentsColl.updateMany(
    {
      name: 'dangchaofeng'
    },
    {
      $set: { age: 24 }
    }
  );
  // 查询多条
  const students = await studentsColl.find().toArray();
  console.log(students);
  // 查询单条
  const student = await studentsColl.findOne();
  console.log(student);

  await studentsColl.deleteMany();
  client.close();
})();
