export type FileImport =
  | {
      filename: string;
      size: number;
      mimetype: string;
      originalName: string;
      fieldname: string;
      encoding: string;
    }
  | undefined;

export interface ImportError {
  row: number;
  errorMessage: string;
}
