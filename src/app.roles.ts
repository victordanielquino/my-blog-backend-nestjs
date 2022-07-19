import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  AUTH = "AUTHOR",
  ADMIN = 'ADMINISTRADOR'
}

export enum AppResouces {
  USER = 'user',
  POST = 'post',
  ROLE = 'role'
}

export const roles: RolesBuilder = new RolesBuilder()

roles
  // AUTHOR:
  .grant(AppRoles.AUTH)
  .updateOwn([AppResouces.USER])
  .deleteOwn([AppResouces.USER])
  .createOwn([AppResouces.POST])
  .updateOwn([AppResouces.POST])
  .deleteOwn([AppResouces.POST])
  // Admin:
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.AUTH)
  .createAny([AppResouces.USER, AppResouces.ROLE])
  .updateAny([AppResouces.USER, AppResouces.ROLE, AppResouces.POST])
  .deleteAny([AppResouces.USER, AppResouces.ROLE, AppResouces.POST])