import useSWR from "swr";
import {
  NativeLandTerritoriesResponse,
  Position,
  PositionError,
} from "../types";

function fetcher(): Promise<NativeLandTerritoriesResponse> {
  return new Promise<Position>((resolve, reject) => {
    function onSuccess(pos: Position) {
      resolve(pos);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, reject);
  }).then((data: Position) => {
    // Promises naturally flatten nested promise values 😱
    // Returning this therefore returns a flattened value
    return fetch(
      `https://native-land.ca/api/index.php?maps=territories&position=${data.coords.latitude},${data.coords.longitude}`
    ).then((resp) => resp.json());
  });
}

export const Main = () => {
  const { data, error } = useSWR<NativeLandTerritoriesResponse, PositionError>(
    "geolocation",
    fetcher
  );

  if (error)
    return (
      <main className="grid items-center justify-center grid-flow-row ">
        Error
      </main>
    );

  if (!data)
    return (
      <main className="grid items-center justify-center grid-flow-row ">
        This app only works on desktop devices at the moment. Please allow
        location access in order to determine territories.
      </main>
    );

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
