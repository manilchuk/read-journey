// src/components/Icon/Icon.tsx

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className = '' }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
