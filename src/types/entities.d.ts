

declare module Entities {

  export namespace Roles {

    type VolvanRole = typeof import('../entities/volovanRole').VolovanRole

    interface RoleData {
      id?: string;
      name?: string;
      description?: string;
      dynamicRoutes?: Object;

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }

  }

  export namespace Users {
    type VolovanUser = typeof import('../entities/volovanUser').VolovanUser

    interface UserData {
      id?: string;
      name?: string;
      email?: string;
      password?: string;
      roles?: string[];

      createdOn?: number;
      createdBy?: string;
      modifiedOn?: number;
      modifiedBy?: string;
      deleted?: boolean;
    }
  }


  export namespace Auth {
    interface LoginData {
      email?: string;
      password?: string;
    }

    interface TokenData {
      id?: string;
      token?: string;
    }

  }
}
