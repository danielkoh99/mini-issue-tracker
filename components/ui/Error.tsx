interface ErrorProps {
  children: React.ReactNode;
}
export const Error: React.FC<ErrorProps> = ({ children }) => {
  return (
    <div>
      <p className="text-red-500 mt-10">{children}</p>
    </div>
  );
};
