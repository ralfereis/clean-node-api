export interface IHasher {
  hash(plainText: string): Promise<string>;
}
