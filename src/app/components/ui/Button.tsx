import * as React from 'react';
import { cn } from "@/app/lib/utils";

// Rozszerzamy typy o `type`, `children` i `className`
export const Button = ({
  primary,
  disabled,
  children, // Dodajemy children do props
  className, // Dodajemy className, aby można było przekazać dodatkowe klasy
  type = 'button', // Domyślnie ustawiamy 'button' jako typ
}: {
  primary?: boolean;
  disabled?: boolean;
  children: React.ReactNode; // Dzieci to dowolny zawartość, np. tekst
  className?: string; // Dodatkowa klasa
  type?: 'button' | 'submit' | 'reset'; // Typ przycisku, domyślnie 'button'
}) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const buttonClasses = cn(
    "px-6 py-3 font-medium rounded-lg transition-all duration-300 ease-in-out",
    "shadow-lg", // Dodajemy cień
    disabled && "opacity-50 cursor-not-allowed", // Styl dla disabled
    primary
      ? "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300"
      : "bg-green-600 text-white hover:bg-green-500 focus:ring-4 focus:ring-green-300",
    className // Dodajemy dodatkowe klasy CSS, jeśli są przekazane
  );

  if (!isClient) {
    return (
      <button className={buttonClasses} disabled={false} type={type}>
        {children}
      </button>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
