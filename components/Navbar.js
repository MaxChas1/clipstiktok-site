import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-600">1Clip</Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-700 hover:text-purple-600">Accueil</Link>
          {session && (
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600">Dashboard</Link>
          )}
          {session ? (
            <button onClick={() => signOut()} className="text-gray-700 hover:text-purple-600">Se déconnecter</button>
          ) : (
            <button onClick={() => signIn()} className="bg-purple-600 text-white px-4 py-2 rounded-full">Se connecter</button>
          )}
        </div>
      </div>
    </nav>
  );
}
