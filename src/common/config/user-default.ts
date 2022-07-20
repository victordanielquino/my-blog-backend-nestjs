import { DataSource } from "typeorm";
import { Role, User } from "../../modules/user/entities";
import { hash } from "bcrypt";

const AppDataSource = new DataSource({
  type: "postgres",
  url:process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const userDefault = async () => {
  AppDataSource.initialize()
    .then(async (dataSource) => {
      const roleDefaut = {
        name: 'ADMIN',
        description: 'ADMINISTRATHOR',
        state: 'AC',
        roleId: 0
      };
      const userDefault = {
        username : process.env.DEFAULT_USERNAME,
        pass : await hash(process.env.DEFAULT_PASSWORD, 10),
        userId : 0,
      }
      const roles: Role[] = await dataSource.query('select * from roles where name='+"'"+roleDefaut.name+"'");
      if (!roles.length) {
        const resp = await dataSource
          .query('insert into roles (name, description) values ('
            + "'" + roleDefaut.name + "'" + ',' + "'" + roleDefaut.description+ "'" + ') returning id;');
        roleDefaut.roleId = resp[0].id;
      }
      else roleDefaut.roleId = roles[0].id;

      const users: User[] = await dataSource.query('select * from users where username='+"'"+userDefault.username+"';");
      if (!users.length) {
        const resp = await dataSource
          .query('insert into users (username, password) values ('
            + "'" + userDefault.username + "'" + ',' + "'" + userDefault.pass+ "'" + ') returning id;');
        userDefault.userId = resp[0].id;

      } else userDefault.userId = users[0].id;

      const relacion = await dataSource
        .query('select * from users_roles where user_id='+userDefault.userId+' and role_id='+roleDefaut.roleId+';');
      if (!relacion.length) {
        await dataSource
          .query('insert into users_roles (user_id, role_id) values ('+ userDefault.userId + ',' + roleDefaut.roleId + ');');
      }
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
}