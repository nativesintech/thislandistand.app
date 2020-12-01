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

      <footer className="grid items-center grid-cols-2 p-2 pl-6 text-gray-600 sm:grid-cols-3">
        <div>
          <img
            className="inline-block"
            src="/netlify-light.svg"
            width={116}
            height={53}
          />
        </div>
        <div className="sm:text-center">
          Made with ❤️ by{" "}
          <a
            className="underline"
            href="https://nativesintech.org/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Natives in Tech
          </a>
          <img
            className="inline-block ml-2"
            src="/natives_in_tech.svg"
            height={20}
            width={20}
          />
        </div>
      </footer>
    </>
  );
};
