export const Error = ({ message }: { message: string }) => {
  return (
    <div>
      <p className="text-red-500 mt-10">{message}</p>
    </div>
  );
};
