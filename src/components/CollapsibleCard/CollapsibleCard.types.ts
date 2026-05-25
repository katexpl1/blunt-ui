import type { ReactNode } from "react";

export interface CollapsibleCardProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  subtitle?: string;
  headerActions?: ReactNode;
  accentColor?: string;
}
