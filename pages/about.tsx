import Head from "next/head";
import { Layout } from "../components/Layout";

export default function About() {
  return (
    <>
      <Head>
        <title>This Land I Stand</title>
      </Head>
      <Layout>
        <main className="p-6 space-y-6">
          <h1 className="text-6xl text-gray-500">About</h1>
          <p className="prose">
            This app is powered by{" "}
            <a
              className="underline"
              href="https://native-land.ca"
              rel="noreferrer noopener"
            >
              native-land.ca
            </a>{" "}
            by making a request to its database using the user's IP address.
          </p>
          <p className="prose">
            This is a project of{" "}
            <a
              href="https://nativesintech.org/"
              rel="noreferrer noopener"
              target="_blank"
            >
              Natives in Tech
            </a>
            , a coalition of Native technologists building tools for Native
            communities. It is free and open source. You can learn more about
            the project from its GitHub repo found at{" "}
            <a
              href="https://github.com/nativesintech/thislandistand.app"
              rel="noreferrer noopener"
              target="_blank"
            >
              nativesintech/thislandistand.app
            </a>
            .
          </p>
          <h2 className="text-3xl text-gray-600">FAQs</h2>
          <p className="prose">
            Why isn't Osage rendering correctly? This might be due to the fact
            that you don't have the Osage font downloaded on your device. Go to{" "}
            <a
              className="underline"
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.google.com/get/noto/#sans-osge"
            >
              https://www.google.com/get/noto/#sans-osge
            </a>{" "}
            to download the font to your device and it should render correctly.
          </p>
        </main>
      </Layout>
    </>
  );
}
