import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import useSWR from "swr";

import { Main } from "../components/Main";
import { Layout } from "../components/Layout";
import {
  NativeLandTerritoriesResponse,
  KeyCDNResponse,
  DataProps,
} from "../helpers/types";
import { NATIVE_LAND_API_BASE_URL } from "../helpers/constants";

const fetcher = (url: string) => fetch(url).then((resp) => resp.json());

export default function Home(props: DataProps) {
  const { data, error } = useSWR<DataProps, string>(
    "api/geolocation",
    fetcher,
    {
      initialData: props,
      refreshInterval: 1000,
    }
  );

  console.log({ data, error, remoteAddress: data?.data?.remoteAddress });

  const base: NativeLandTerritoriesResponse = [];

  return (
    <>
      <Head>
        <title>This Land I Stand</title>
      </Head>
      <Layout>{/* <Main data={{}} error={props.error} /> */}</Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ip: string =
    process.env.NODE_ENV === "development"
      ? process.env?.localIP ?? ""
      : context.req.connection?.remoteAddress ?? "";

  try {
    const geolocation: NativeLandTerritoriesResponse = await fetch(
      `https://tools.keycdn.com/geo.json?host=${ip}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp: KeyCDNResponse) => {
        return fetch(
          `${NATIVE_LAND_API_BASE_URL}?maps=territories&position=${resp.data.geo.latitude},${resp.data.geo.longitude}`
        ).then((resp) => resp.json());
      });

    return {
      props: {
        data: geolocation,
      },
    };
  } catch (e) {
    return {
      props: {
        error: "There was an error getting the geolocation.",
      },
    };
  }
}
