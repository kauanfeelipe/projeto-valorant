import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'projeto-valorant';

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
});
