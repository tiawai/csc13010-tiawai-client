import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/common/header';

const meta: Meta<typeof Header> = {
    title: 'Example/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
        onClick: { action: 'clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
