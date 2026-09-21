import type { Meta, StoryObj } from "@storybook/react-vite";
import CompletionDialog from "./CompletionDialog";

const meta = {
  component: CompletionDialog,
} satisfies Meta<typeof CompletionDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Incorrect: Story = {
  args: {
    result: "incorrect",
    onClose: () => {},
    onPlayAgain: () => {},
  },
};

export const Solved: Story = {
  args: {
    result: "solved",
    onClose: () => {},
    onPlayAgain: () => {},
  },
};
