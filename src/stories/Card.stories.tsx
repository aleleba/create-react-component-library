import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card, TCardProps } from '@Components/Card';

//import { Card } from '../../dist'

export default {
    title: 'Example/Card',
    component: Card
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: TCardProps) => <Card {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    /**
     * This is the title of the card, it needs to be a string
    */
    title: "Test Text",
    /**
     * This is the title of the card, it needs to be a React Component
    */
    children: (<p>Content of the card</p>)
}