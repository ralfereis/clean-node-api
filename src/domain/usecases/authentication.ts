export interface IAuthentication {
  auth(
    authenticationParams: IAuthentication.Params,
  ): Promise<IAuthentication.Result>;
}

export namespace IAuthentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    name: string;
  };
}
