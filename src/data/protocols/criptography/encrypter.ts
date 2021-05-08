export interface IEncrypter {
  encrypt(plainText: string): Promise<string>;
}
