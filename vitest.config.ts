import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: './tests',
    reporters: ['verbose'],
    testTimeout: 50000,
    setupFiles: './tests/utils/setup.ts',
    fileParallelism: false,
    isolate: false,
  },
});
