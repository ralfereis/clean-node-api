export interface ICheckAccountByEmailRepository {
  checkByEmail(email: string): Promise<ICheckAccountByEmailRepository.Result>;
}

export namespace ICheckAccountByEmailRepository {
  export type Result = boolean;
}
