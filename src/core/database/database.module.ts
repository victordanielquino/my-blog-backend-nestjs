import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";

import config from "../../common/config/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configEnv: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          url: configEnv.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false, // para que la base de datos se sincronize conforme se creen las entities
          autoLoadEntities: true, // sincronizar con las entidades creadas
        };
      },
    }),
  ]
})
export class DatabaseModule {}
