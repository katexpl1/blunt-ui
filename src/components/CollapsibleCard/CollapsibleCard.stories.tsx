import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { CollapsibleCard } from "./CollapsibleCard";
import { Button } from "../Button";
import { Badge } from "../Badge";

type StoryArgs = ComponentProps<typeof CollapsibleCard> & { text: string };

const meta: Meta<StoryArgs> = {
  title: "Components/CollapsibleCard",
  component: CollapsibleCard,
  argTypes: {
    text: { control: "text", name: "text (children)" },
    children: { table: { disable: true } },
    headerActions: { table: { disable: true } },
    onToggle: { table: { disable: true } },
    open: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: ({ text, ...args }) => (
    <CollapsibleCard {...args}>
      <p style={{ margin: 0 }}>{text}</p>
    </CollapsibleCard>
  ),
  args: {
    title: "blunt-ui",
    defaultOpen: true,
    text: "React component library in neo-brutalism style. Thick borders, offset shadows, zero fluff.",
  },
};

export const WithSubtitle: Story = {
  render: ({ text, ...args }) => (
    <CollapsibleCard {...args}>
      <p style={{ margin: 0 }}>{text}</p>
    </CollapsibleCard>
  ),
  args: {
    title: "blunt-ui",
    subtitle: "v0.1.1 · React · TypeScript",
    defaultOpen: true,
    text: "React component library in neo-brutalism style. Thick borders, offset shadows, zero fluff.",
  },
};

export const WithHeaderActions: Story = {
  render: ({ text, ...args }) => (
    <CollapsibleCard
      {...args}
      headerActions={
        <>
          <Badge variant="primary">npm badge</Badge>
          <Button size="sm" variant="secondary">
            GitHub
          </Button>
        </>
      }
    >
      <p style={{ margin: 0 }}>{text}</p>
    </CollapsibleCard>
  ),
  args: {
    title: "blunt-ui",
    subtitle: "v0.1.1",
    defaultOpen: false,
    text: "React component library in neo-brutalism style. Thick borders, offset shadows, zero fluff.",
  },
};

export const Controlled: Story = {
  render: ({ text }) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Button onClick={() => setOpen((v) => !v)}>
          {open ? "Collapse" : "Expand"}
        </Button>
        <CollapsibleCard title="Controlled card" open={open} onToggle={setOpen}>
          <p style={{ margin: 0 }}>{text}</p>
        </CollapsibleCard>
      </div>
    );
  },
  args: {
    text: "This card is controlled from outside via the open prop.",
  },
};

export const ClosedByDefault: Story = {
  render: ({ text, ...args }) => (
    <CollapsibleCard {...args}>
      <p style={{ margin: 0 }}>{text}</p>
    </CollapsibleCard>
  ),
  args: {
    title: "Collapsed by default",
    defaultOpen: false,
    text: "Click the header to reveal this content.",
  },
};

export const AccentColor: Story = {
  render: ({ text }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <CollapsibleCard
        title="blunt-ui"
        subtitle="primary accent"
        accentColor="#0070f3"
        defaultOpen
      >
        <p style={{ margin: 0 }}>{text}</p>
      </CollapsibleCard>
      <CollapsibleCard
        title="blunt-ui"
        subtitle="custom accent"
        accentColor="#f97316"
        defaultOpen
      >
        <p style={{ margin: 0 }}>{text}</p>
      </CollapsibleCard>
    </div>
  ),
  args: {
    text: "React component library in neo-brutalism style. Thick borders, offset shadows, zero fluff.",
  },
};
