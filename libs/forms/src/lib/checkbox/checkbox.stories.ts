import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PseudoCheckboxComponent } from '../pseudo-checkbox/pseudo-checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CommonModule, PseudoCheckboxComponent]
    })
  ],
  argTypes: {
    checked: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  render: ({ checked, disabled }) => ({
    template: `
      <shtav-checkbox-field [checked]="${checked}" [disabled]="${disabled}">
        Check me out
      </shtav-checkbox-field>
    `
  })
};
export default meta;

export const Default: StoryObj<CheckboxComponent> = {};
