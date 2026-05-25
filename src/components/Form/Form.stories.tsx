import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { FormField } from "./FormField";
import { Input } from "../Input";
import { Button } from "../Button";
import { Select } from "../Select";
import { ToastProvider, useToast, useForm } from "../../hooks";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;

const roleOptions = [
  { value: "frontend", label: "frontend dev" },
  { value: "backend", label: "backend dev" },
  { value: "fullstack", label: "fullstack dev" },
  { value: "designer", label: "designer" },
];

type SignupValues = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const validate = (
  values: SignupValues,
): Partial<Record<keyof SignupValues, string>> => {
  const errors: Partial<Record<keyof SignupValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = "This field can't be empty";
  }

  if (!values.email.trim()) {
    errors.email = "This field can't be empty";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "doesn't look like an email";
  }

  if (!values.password) {
    errors.password = "This field can't be empty";
  } else if (values.password.length < 8) {
    errors.password = "at least 8 chars";
  }

  if (!values.role) {
    errors.role = "pick one";
  }

  return errors;
};

export const SignupForm: Story = {
  render: () => {
    // Example usage of useToast hook :)
    const { toast } = useToast();

    const { values, errors, handleChange, handleBlur, handleSubmit, reset } =
      useForm<SignupValues>({
        initialValues: { name: "", email: "", password: "", role: "" },
        validate,
        onSubmit: () => {
          toast.success("account created!");
          reset();
        },
        onError: () => {
          toast.error("fix the errors first");
        },
      });

    return (
      <Form onSubmit={handleSubmit} style={{ width: 320 }}>
        <FormField label="name" error={errors.name} required>
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your name"
          />
        </FormField>

        <FormField label="email" error={errors.email} required>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField
          label="password"
          error={errors.password}
          helperText={!errors.password ? "Min 8 characters" : undefined}
          required
        >
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
          />
        </FormField>

        <FormField label="role" error={errors.role} required>
          <Select
            name="role"
            options={roleOptions}
            placeholder="what do you do?"
            value={values.role}
            onChange={handleChange}
            fullWidth
          />
        </FormField>

        <Button type="submit">Create account</Button>
      </Form>
    );
  },
};

export const WithHelperText: Story = {
  render: () => (
    <Form style={{ width: 320 }}>
      <FormField
        label="Username"
        helperText="Letters and numbers only"
        required
      >
        <Input placeholder="katexpl1" />
      </FormField>
      <FormField label="bio" helperText="Optional field">
        <Input placeholder="Tell us about yourself" />
      </FormField>
      <Button type="submit">save</Button>
    </Form>
  ),
};
