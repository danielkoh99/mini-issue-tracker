interface NotFoundProps {
  children: React.ReactNode;
}
export const NotFound: React.FC<NotFoundProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-bold mb-2 text-gray-800">Not Found</h2>
      <p className="text-gray-600 mb-4">{children}</p>
    </div>
  );
};
