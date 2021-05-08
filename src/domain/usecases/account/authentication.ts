export type AuthenticationParams = {
  email: string;
  password: string;
};
export interface IAuthentication {
  auth(authenticationParams: AuthenticationParams): Promise<string>;
}
