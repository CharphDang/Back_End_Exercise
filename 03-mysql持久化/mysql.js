(async () => {
  const mysql = require('mysql2/promise');
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'kaikeba'
  };
  const connection = await mysql.createConnection(cfg);

  // 创建表
  let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS person (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) NULL,
        PRIMARY KEY (id))
    `);
  console.log('create', ret);

  // 增
  ret = await connection.execute(
    `
            INSERT INTO person(name)
            VALUES(?)
  `,
    ['dangchaofeng']
  );

  // 删
  ret = await connection.execute(`
        DELETE FROM person
        WHERE id=2
    `);

  //   改
  ret = await connection.execute(`
        UPDATE person
            SET name = "苏亮"
        WHERE id = 3
    `);

  // 查
  ret = await connection.execute(`
            SELECT * FROM person
    `);
  console.log(JSON.stringify(ret[0]));

  connection.end();
})();
