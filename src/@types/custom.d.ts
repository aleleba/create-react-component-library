declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "@storybook/react" {
    export * from "@storybook/react/dist/index";
}
