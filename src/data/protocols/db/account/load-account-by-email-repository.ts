export interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<ILoadAccountByEmailRepository.Result>;
}

export namespace ILoadAccountByEmailRepository {
  export type Result = {
    id: string;
    name: string;
    password: string;
  };
}
