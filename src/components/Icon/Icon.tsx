interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 24, className = '' }: IconProps) => {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
