import Image from "next/image";
import Link from "next/link";
import '../app/globals.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="mt-6 text-4xl font-bold text-center">
          Seja muito bem-vindo(a)!
        </h1>
        <p className="mt-4 text-lg text-center">
          Clique no botão abaixo para continuar.
        </p>
        <Link href="/user">
          <a className="mt-6 rounded-lg bg-blue-500 px-6 py-3 text-white text-lg font-semibold transition hover:bg-blue-600">
            Sensedia Challenge
          </a>
        </Link>
      </div>
    </main>
  );
}
