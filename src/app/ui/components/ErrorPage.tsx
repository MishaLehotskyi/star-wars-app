import Link from 'next/link';

interface Props {
  errorMessage: string,
}

export default function ErrorPage({ errorMessage }: Props) {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Error</h1>
        <p className="text-lg text-gray-700 mb-8">{errorMessage}</p>
        <Link href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-md transition duration-300 ease-in-out">Go
        to Home</Link>
      </div>
    </div>
  );
}
