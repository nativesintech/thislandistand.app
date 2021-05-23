import { NativeLandTerritoriesResponse } from "../types";

type Props = {
  data?: NativeLandTerritoriesResponse;
  error?: Error;
};

export const Main = ({ data, error }: Props) => {
  if (error)
    return (
      <main className="grid items-center justify-center grid-flow-row capitalize">
        {error.message}
      </main>
    );

  if (!data)
    return (
      <main className="grid items-center justify-center grid-flow-row ">
        Loading...
      </main>
    );

  if (data.length === 0) {
    return (
      <main className="grid items-center justify-center grid-flow-row ">
        There are no documented territories in your location.
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
