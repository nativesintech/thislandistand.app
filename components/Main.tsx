import useSWR from "swr";
import { NativeLandTerritoriesResponse } from "../helpers/types";

const fetcher = (url: string) => fetch(url).then((resp) => resp.json());

export const Main = () => {
  const { data, error } = useSWR<NativeLandTerritoriesResponse, string>(
    "/api/geolocation",
    fetcher
  );

  if (error)
    return (
      <main className="grid items-center justify-center grid-flow-row text-3xl text-gray-500">
        {error}
      </main>
    );

  if (!data)
    return (
      <main className="grid items-center justify-center grid-flow-row text-3xl text-gray-500">
        Loading...
      </main>
    );

  if (data && data.length === 0) {
    return (
      <main className="grid items-center justify-center grid-flow-row text-3xl text-gray-500">
        There is no documented traditional territory in your area at this time.
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center p-8">
      <div className="max-w-md space-y-6">
        <h2 className="text-3xl text-gray-500">
          You are on the traditional and/or contemporary territory of the...
        </h2>
        <ul className="space-y-6 text-gray-600 ">
          {data.map((d) => {
            return (
              <li key={d.id} className="text-2xl underline">
                <a
                  href={d.properties.description}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {d.properties.Name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};
