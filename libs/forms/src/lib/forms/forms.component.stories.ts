import type { Meta, StoryObj } from '@storybook/angular';
import { FormsComponent } from './forms.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FormsComponent> = {
  component: FormsComponent,
  title: 'FormsComponent',
};
export default meta;
type Story = StoryObj<FormsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/forms works!/gi)).toBeTruthy();
  },
};
