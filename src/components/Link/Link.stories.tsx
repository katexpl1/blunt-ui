import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  args: {
    children: "Click here",
    href: "#",
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Subtle: Story = {
  args: { variant: "subtle" },
};

export const External: Story = {
  args: {
    children: "Open in new tab",
    href: "https://example.com",
    external: true,
  },
};

export const InlineText: Story = {
  render: () => (
    <p>
      Read the <Link href="#">Documentation</Link> or check out the{" "}
      <Link href="#" variant="subtle">
        changelog
      </Link>
      .
    </p>
  ),
};
