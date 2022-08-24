export interface IFileProvider {
  save(base64File: string, fileName: string): void;
}
