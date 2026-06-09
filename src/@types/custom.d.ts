declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}

declare module '*.scss';
declare module '*.sass';
declare module '*.css';

declare module '@storybook/react' {
    export * from '@storybook/react/dist/index';
}
