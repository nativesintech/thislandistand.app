import { Handler } from "@netlify/functions";
import { lookup as geoLookup } from "geoip-lite";
import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { identity, pipe } from "fp-ts/lib/function";
import axios from "axios";

const fetchData = ({ lat, long }: { lat: number; long: number }) => {
  return axios
    .get(
      `https://native-land.ca/api/index.php?maps=territories&position=${lat},${long}`
    )
    .then((resp) => ({
      statusCode: 200,
      body: JSON.stringify(resp.data),
    }));
};

export const handler: Handler = async function (event) {
  const requestFn = pipe(
    TE.fromOption(() => ({
      statusCode: 404,
      body: "no 'x-forwarded-for' in headers.",
    }))(O.fromNullable(event.headers["x-forwarded-for"])),
    TE.chain((ip) =>
      TE.fromOption(() => ({
        statusCode: 404,
        body: "no lookup 'x-forwarded-for'",
      }))(O.fromNullable(geoLookup(ip)))
    ),
    TE.map(({ ll: [lat, long] }) => ({ lat, long })),
    TE.chain(({ lat, long }) => {
      return pipe(
        TE.tryCatch(
          () => fetchData({ lat, long }),
          (e) => ({
            statusCode: 500,
            body: JSON.stringify(e),
          })
        )
      );
    })
  );

  const result = await requestFn();

  const response = pipe(result, E.fold(identity, identity));

  return response;
};
