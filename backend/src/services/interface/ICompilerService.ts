export interface ICompilerService {
  run(language: string, code: string): Promise<string>;
}
