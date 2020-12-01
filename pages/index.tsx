import Head from "next/head";
import { Main } from "../components/Main";
import { Layout } from "../components/Layout";
import { GetServerSidePropsContext } from "next";
import requestIp from "request-ip";
import geoip from "geoip-lite";

type Props = {
  geo: any;
};

export default function Home(props: Props) {
  console.log({ geo: props.geo });

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const clientIP = requestIp.getClientIp(context.req);
  const geo = geoip.lookup(clientIP);

  return {
    props: {
      geo,
    },
  };
}
