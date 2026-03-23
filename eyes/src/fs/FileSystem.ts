export interface IFileSystem {
  readFile(path: string, encoding?: 'utf-8'): Promise<string>;
  writeFile(path: string, data: string): Promise<void>;
}
