export interface ILoadAccountByToken {
  load(accessToken: string, role?: string): Promise<ILoadAccountByToken.Result>;
}

export namespace ILoadAccountByToken {
  export type Result = {
    id: string;
  };
}
