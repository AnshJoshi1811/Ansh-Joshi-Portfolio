import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type PixelButtonVariant = 'primary' | 'lavender' | 'yellow' | 'sage' | 'surface';
type PixelButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: PixelButtonVariant;
  size?: PixelButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type PixelButtonProps = ButtonProps | AnchorProps;

const VARIANT_CLASSES: Record<PixelButtonVariant, string> = {
  primary: 'bg-ink text-surface hover:bg-[#343434]',
  lavender: 'bg-lavender text-surface hover:bg-[#8266B2]',
  yellow: 'bg-yellow text-ink hover:bg-[#DEC070]',
  sage: 'bg-sage text-ink hover:bg-[#95AA98]',
  surface: 'bg-surface text-ink hover:bg-recessed',
};

const SIZE_CLASSES: Record<PixelButtonSize, string> = {
  sm: 'min-h-[38px] px-3.5 py-1.5 text-xs tracking-[0.01em]',
  md: 'min-h-[42px] px-5 py-2.5 text-sm tracking-[0.01em]',
  lg: 'min-h-[46px] px-6 py-3 text-sm tracking-[0.01em]',
};

export function PixelButton(props: PixelButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...rest
  } = props;

  const classes = `pixel-btn ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim();

  if ('href' in props && props.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={props.href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
