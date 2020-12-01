import Head from "next/head";
import { Main } from "../components/Main";
import { Layout } from "../components/Layout";
import { useNativeLandCA } from "../hooks/useNativeLandCA";

export default function Home() {
  const { data, error } = useNativeLandCA();

  return (
    <>
      <Head>
        <title>This Land I Stand</title>
      </Head>
      <Layout>
        <Main data={data} error={error} />
      </Layout>
    </>
  );
}
