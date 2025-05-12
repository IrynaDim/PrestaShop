import { defineConfig } from '@playwright/test';

const viewportWidth = parseInt(process.env.VIEWPORT_WIDTH || '1280', 10);
const viewportHeight = parseInt(process.env.VIEWPORT_HEIGHT || '720', 10);
const threadCount = parseInt(process.env.THREADS || '2', 10); // по умолчанию 2

export default defineConfig({
    timeout: 30000,
    expect: {
        timeout: 15000,
    },
    workers: threadCount,
    use: {
        viewport: {
            width: viewportWidth,
            height: viewportHeight,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        // {
        //     name: 'firefox',
        //     use: { browserName: 'firefox' },
        // },
        // {
        //     name: 'webkit',
        //     use: { browserName: 'webkit' },
        // },
    ],
});
