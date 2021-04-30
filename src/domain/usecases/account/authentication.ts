export type AuthenticationParams = {
  email: string;
  password: string;
};
export interface IAuthentication {
  auth(authentication: AuthenticationParams): Promise<string>;
}
