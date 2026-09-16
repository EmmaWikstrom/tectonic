import type { Meta, StoryObj } from "@storybook/react-vite"
import Cell from "./Cell"

const meta = {
  component: Cell,
} satisfies Meta<typeof Cell>

export default meta

type Story = StoryObj<typeof meta>

export const Given: Story = {
    args: {
      cell: {
        id: "0-0",
        row: 0,
        col: 0,
        regionId: "A",
        solution: 1,
        isGiven: true,
      },
      value: undefined,
      isSelected: false,
      onSelect: () => {},
      hasTopBorder: true,
      hasLeftBorder: true,
      hasRightBorder: false,
      hasBottomBorder: false,
    },
  }

  export const Empty: Story = {
    args: {
      cell: {
        id: "0-1",
        row: 0,
        col: 1,
        regionId: "A",
        solution: 2,
        isGiven: false,
      },
      value: undefined,
      isSelected: false,
      onSelect: () => {},
      hasTopBorder: true,
      hasLeftBorder: false,
      hasRightBorder: false,
      hasBottomBorder: false,
    },
  }

  export const Selected: Story = {
    args: {
      cell: {
        id: "0-1",
        row: 0,
        col: 1,
        regionId: "A",
        solution: 2,
        isGiven: false,
      },
      value: undefined,
      isSelected: true,
      onSelect: () => {},
      hasTopBorder: true,
      hasLeftBorder: false,
      hasRightBorder: false,
      hasBottomBorder: false,
    },
  }

  export const WithValue: Story = {
    args: {
      cell: {
        id: "0-1",
        row: 0,
        col: 1,
        regionId: "A",
        solution: 2,
        isGiven: false,
      },
      value: 3,
      isSelected: false,
      onSelect: () => {},
      hasTopBorder: true,
      hasLeftBorder: false,
      hasRightBorder: false,
      hasBottomBorder: false,
    },
  }

  export const SelectedWithValue: Story = {
    args: {
      cell: {
        id: "0-1",
        row: 0,
        col: 1,
        regionId: "A",
        solution: 2,
        isGiven: false,
      },
      value: 3,
      isSelected: true,
      onSelect: () => {},
      hasTopBorder: true,
      hasLeftBorder: false,
      hasRightBorder: false,
      hasBottomBorder: false,
    },
  }