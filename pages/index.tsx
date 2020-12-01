import Head from "next/head";
import { Main } from "../components/Main";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>This Land I Stand</title>
      </Head>
      <Layout>
        <Main />
      </Layout>
    </>
  );
}
