import type { Meta, StoryObj } from "@storybook/react-vite"
import NumberPad from "./NumberPad"

const meta = {
  component: NumberPad,
} satisfies Meta<typeof NumberPad>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    numbers: [1, 2, 3, 4],
    onNumberSelect: () => {},
    onErase: () => {},
    disabled: false,
  },
}

export const Disabled: Story = {
    args: {
      numbers: [1, 2, 3, 4],
      onNumberSelect: () => {},
      onErase: () => {},
      disabled: true,
    },
  }

export const FiveNumbers: Story = {
    args: {
      numbers: [1, 2, 3, 4, 5],
      onNumberSelect: () => {},
      onErase: () => {},
      disabled: false,
    },
  }