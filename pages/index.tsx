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
        {typeof data === "string" && (
          <div className="flex items-center justify-center">
            There was an error: {data}
          </div>
        )}
        {Array.isArray(data) && <Main data={data} error={error} />}
      </Layout>
    </>
  );
}
