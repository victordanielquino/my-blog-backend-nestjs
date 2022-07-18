import { ConfigService } from "@nestjs/config";
import { Client } from "pg";
import { DataSource } from "typeorm";
import { User } from "../../modules/user/entities";
import { UserService } from "../../modules/user/services/user.service";

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_blog',
  password: '12345',
  port: 5432
});


export const setDefaultUser = async () => {

  await client.connect();
  client.query('select * from users', (err, res) => {
    if (res) console.log('res', res);
    else console.log('error:', err);
    client.end();
  })
  //await client.end();
}

export const defaulUser = async () => {
  /*const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "12345",
    database: "my_blog",
  })*/
  //const user = dataSource.getRepository<User>(User).find();
  // const user = await userRepository.findOneBy(
  //   { id: 1 }
  // )
}