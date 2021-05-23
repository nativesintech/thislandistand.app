import { NativeLandTerritoriesResponse } from "../types";
import * as RD from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";

type Props = {
  data: RD.RemoteData<string, NativeLandTerritoriesResponse>;
  agent: O.Option<string>;
};

export const Main = ({ data, agent }: Props) => {
  return pipe(
    data,
    RD.fold(
      () => (
        <main className="grid items-center justify-center grid-flow-row ">
          Loading...
        </main>
      ),
      () => (
        <main className="grid items-center justify-center grid-flow-row text-center ">
          <section>
            Loading...
            {pipe(
              agent,
              O.map((a) => /safari/i.test(a)),
              O.fold(
                () => null,
                () => (
                  <small className="block mt-4">
                    It appears you are using Safari. This app may not work on
                    Safari on iOS.
                  </small>
                )
              )
            )}
          </section>
        </main>
      ),
      (e) => (
        <main className="grid items-center justify-center grid-flow-row capitalize">
          {e}
        </main>
      ),
      (d) => {
        if (d.length === 0) {
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
                You are on the traditional and/or contemporary territory of
                the...
              </h2>
              <ul className="space-y-6 text-gray-600 ">
                {d.map((d) => {
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
      }
    )
  );
};
