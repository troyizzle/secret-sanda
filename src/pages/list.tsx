import { People } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";

type PersonCardProps = {
  person: People;
};

function PersonCard({ person }: PersonCardProps) {
  const [show, setShow] = useState(false);

  function handleClick() {
    const result = confirm(
      "Are you sure you want to show this, if its not you this ruins the game"
    );
    if (result) {
      setShow(true);
    }
  }

  return (
    <div>
      {person.name} tiene{" "}
      {person.chosenName ? (
        <>
          <span className={show ? "" : "hidden"}>{person.chosenName}</span>
          {show ? (
            <button
            className="ml-2 rounded-sm bg-gray-300 p-1"
            onClick={() => setShow(false)}
            >Hide</button>
          ) : (
            <button
              className="ml-2 rounded-sm bg-blue-200 p-1"
              onClick={handleClick}
            >
              Show
            </button>
          )}
        </>
      ) : (
        <span>Nadie</span>
      )}
    </div>
  );
}

export default function List() {
  const people = trpc.people.getAll.useQuery();
  const [name, setName] = useState<string>("");

  const { mutate, error } = trpc.people.createPerson.useMutation({
    onSuccess: () => {
      people.refetch();
    },
  });

  if (!people.data) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="mx-2 my-3 flex items-center">
        <input
          onChange={(event) => setName(event.currentTarget.value)}
          className="w-full rounded-md border border-red-300 p-2 shadow-sm focus:border-red-700 focus:outline-none"
          type="text"
          placeholder="Add..."
        />
        <button
          disabled={name == ""}
          onClick={() => mutate({ name: name })}
          className="rounded-md bg-green-400 p-2"
          type="submit"
        >
          Add
        </button>
      </div>
      <div className="mx-4 my-6 text-center">
        {people.data.map((person) => (
          <div key={person.id}>
            <PersonCard person={person} />
          </div>
        ))}
      </div>
    </>
  );
}
