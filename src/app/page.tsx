import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Star Wars Universe</h1>
        <p className="text-lg text-gray-700 mb-8">Explore the galaxy, meet characters, and discover adventures.</p>
        <Link href="/heroes"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-md transition duration-300 ease-in-out">Get
          Started</Link>
      </div>
    </main>
  );
}
