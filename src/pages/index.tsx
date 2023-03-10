import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const people = trpc.people.getNames.useQuery();
  const [show, setShow] = useState<string | null>(null);
  const [id, setId] = useState<string>("");
  const { mutate, error } = trpc.people.assignPerson.useMutation({
    onSuccess: (people) => {
      setShow(`Tu tienes ${people.chosenName}`);
    },
  });

  return (
    <>
      <Head>
        <title>Secret Santa</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://secret-sanda-production.up.railway.app"
        />
        <meta property="og:title" content="Secret Santa" />
        <meta property="og:description" content="Secret Santa" />
        <meta
          property="og:image"
          content="https://secret-sanda-production.up.railway.app/images/poster.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-green-600 via-red-500 to-red-700">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Secret <span className="text-[hsl(280,100%,70%)]">Santa</span>
          </h1>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {error && <p>{error.message}</p>}
            {show ? (
              <div className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                {show}
              </div>
            ) : (
              <>
                <select
                  className="rounded-lg p-2"
                  onChange={(e) => setId(e.currentTarget.value)}
                >
                  <option value="">Elige tu nombre</option>
                  {people?.data?.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
                <button
                  disabled={id == ""}
                  onClick={() => mutate({ id: id })}
                  className="rounded-md bg-green-300 p-2"
                >
                  Consigue tu persona
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
