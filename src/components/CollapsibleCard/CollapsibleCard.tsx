import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  CardHeader,
  CardWrapper,
  ChevronWrapper,
  ContentBody,
  ContentInner,
  ContentWrapper,
  HeaderActions,
  HeaderText,
  Subtitle,
  Title,
} from "./CollapsibleCard.styles";
import type { CollapsibleCardProps } from "./CollapsibleCard.types";

export function CollapsibleCard({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  subtitle,
  headerActions,
  accentColor,
}: CollapsibleCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const contentId = useId();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const next = !isOpen;
    if (!isControlled) {
      setInternalOpen(next);
    }
    onToggle?.(next);
  };

  return (
    <CardWrapper $accentColor={accentColor}>
      <CardHeader
        type="button"
        $open={isOpen}
        $accentColor={accentColor}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={handleToggle}
      >
        <HeaderText>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </HeaderText>

        {headerActions && (
          <HeaderActions onClick={(e) => e.stopPropagation()}>
            {headerActions}
          </HeaderActions>
        )}

        <ChevronWrapper
          $open={isOpen}
          $accentColor={accentColor}
          aria-hidden="true"
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </ChevronWrapper>
      </CardHeader>

      <ContentWrapper $open={isOpen}>
        <ContentInner id={contentId} role="region" aria-label={title}>
          <ContentBody>{children}</ContentBody>
        </ContentInner>
      </ContentWrapper>
    </CardWrapper>
  );
}

CollapsibleCard.displayName = "CollapsibleCard";
