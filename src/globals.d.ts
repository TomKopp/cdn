declare module 'esbuild-copy-static-files' {
  import type { Plugin } from 'esbuild';
  export type CopyStaticFilesOptions = {
    src: string;
    dest: string;
    filter: (src: string, dest: string) => boolean;

    dereference: boolean;
    errorOnExist: boolean;
    force: boolean;
    preserveTimestamps: boolean;
    recursive: boolean;
  };
  const copyStaticFiles: (options?: Partial<CopyStaticFilesOptions>) => Plugin;
  export default copyStaticFiles;
}

declare module 'sri-toolbox' {
  export function generate(
    options: { algorithms: Array<'sha384'> },
    data: string | Buffer
  ): string;
}
