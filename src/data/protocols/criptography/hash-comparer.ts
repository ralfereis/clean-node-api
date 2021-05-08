export interface IHashComparer {
  compare(plainText: string, digest: string): Promise<boolean>;
}
