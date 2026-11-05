import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button.types";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"] satisfies ButtonVariant[],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"] satisfies ButtonSize[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Loading: Story = {
  args: {
    children: "Click Me",
    isLoading: true,
  },
};
