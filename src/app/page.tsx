import Link from 'next/link';

const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex space-x-4">
        <Link href="/users">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Użytkownicy
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Logowanie
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
