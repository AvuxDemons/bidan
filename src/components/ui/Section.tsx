interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={`border-1 border-default-200 rounded-lg bg-default-100 shadow ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
