import Link from "next/link";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="flex items-center justify-between p-6 text-gray-600 border-2">
        <Link href="/">This Land I Stand</Link>
        <div>
          <Link href="/about">About</Link>
        </div>
      </header>

      {children}

      <footer className="flex items-center justify-center p-2 space-x-2 text-center text-gray-600 border-2">
        Made with ❤️ by{" "}
        <a
          className="ml-2 underline"
          href="https://nativesintech.org/"
          rel="noreferrer noopener"
          target="_blank"
        >
          Natives in Tech
        </a>
        <img
          className="inline-block"
          src="/natives_in_tech.svg"
          height={20}
          width={20}
        />
      </footer>
    </>
  );
};
