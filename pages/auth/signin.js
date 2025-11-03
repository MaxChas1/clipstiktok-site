import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center text-purple-600">Se connecter</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="mt-4">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Se connecter avec {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
