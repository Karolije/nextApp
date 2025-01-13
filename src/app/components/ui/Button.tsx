import { cn } from '@/app/lib/utils';

export const Button = ({
  primary,
  disabled,
  children,
  className,
  type = 'button',
}: {
  primary?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const buttonClasses = cn(
    'px-6 py-3 font-medium rounded-lg transition-all duration-300 ease-in-out',
    'shadow-lg',
    disabled && 'opacity-50 cursor-not-allowed',
    primary
      ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300'
      : 'bg-green-600 text-white hover:bg-green-500 focus:ring-4 focus:ring-green-300',
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
