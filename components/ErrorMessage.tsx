interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-5 border-l-4 border-yellow-400">
      <strong>Error:</strong> {error}
      <br />
      <br />
      Please make sure you&apos;ve allowed location access and try again.
    </div>
  );
}

