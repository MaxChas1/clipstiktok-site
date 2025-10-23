import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Head>
        <title>ClipTikTok - Transformez vos vidéos en clips captivants</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-white/10">
          <h1 className="text-2xl font-bold">ClipTikTok</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            <Link href="/upload" className="hover:underline">
              Uploader
            </Link>
            <Link href="/connect" className="hover:underline">
              Connecter TikTok
            </Link>
          </nav>
        </header>
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            Transformez vos vidéos en clips irrésistibles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mb-8 text-lg md:text-xl"
          >
            Utilisez notre outil alimenté par l'IA pour découper automatiquement vos vidéos longues en extraits courts et engageants prêts à être partagés.
          </motion.p>
          <div className="flex space-x-4 mb-12">
            <Link href="/connect" className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
              Connecter TikTok
            </Link>
            <Link href="/upload" className="px-6 py-3 bg-purple-800 font-semibold rounded-lg shadow hover:bg-purple-900 transition">
              Uploader une vidéo
            </Link>
          </div>
          {/* Features section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-md">
              <div className="mb-4">
                {/* Icon 1 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 114 0v6m5 0v-6a7 7 0 10-14 0v6m14 0H5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Découpage intelligent</h3>
              <p className="text-sm">
                Notre algorithme identifie automatiquement les moments forts de votre vidéo pour créer des clips captivants.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-md">
              <div className="mb-4">
                {/* Icon 2 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support multi sources</h3>
              <p className="text-sm">
                Importez des vidéos depuis votre ordinateur ou d’autres plateformes pour encore plus de souplesse.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-md">
              <div className="mb-4">
                {/* Icon 3 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4l1.41 1.41L9.83 9H21v2H9.83l3.58 3.59L12 16l-7-7 7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Publication directe</h3>
              <p className="text-sm">
                Connectez votre compte TikTok et publiez vos clips instantanément après leur génération.
              </p>
            </div>
          </section>
        </main>
        {/* Footer */}
        <footer className="text-center py-6 mt-auto bg-white/10 backdrop-blur-sm">
          <p className="text-sm">&copy; {new Date().getFullYear()} ClipTikTok. Tous droits réservés.</p>
        </footer>
      </div>
    </>
  );
}
