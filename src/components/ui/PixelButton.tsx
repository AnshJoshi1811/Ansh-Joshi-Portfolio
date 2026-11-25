import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type PixelButtonVariant = 'primary' | 'cobalt' | 'surface' | 'subtle';
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
  primary:
    'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_2px_0_0_#020617] hover:bg-[#1E293B]',
  cobalt:
    'bg-[#2563EB] text-white border-[#1D4ED8] shadow-[0_2px_0_0_#1E40AF] hover:bg-[#1D4ED8]',
  surface:
    'bg-white text-[#0F172A] border-[#CBD5E1] shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:bg-[#F8FAFC] hover:border-[#94A3B8]',
  subtle:
    'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE] hover:bg-[#DBEAFE]',
};

const SIZE_CLASSES: Record<PixelButtonSize, string> = {
  sm: 'min-h-[36px] px-3.5 py-1.5 text-xs',
  md: 'min-h-[42px] px-4.5 py-2 text-sm',
  lg: 'min-h-[46px] px-5.5 py-2.5 text-sm',
};

export function PixelButton(props: PixelButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...rest
  } = props;

  const classes = `pro-btn ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim();

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
    <button
      type={buttonProps.type ?? 'button'}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
