import Head from "next/head";

import { Main } from "../components/Main";
import { Layout } from "../components/Layout";

import { useGeolocation } from "../hooks/geolocation";

export default function Home() {
  const { data, error } = useGeolocation();

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
