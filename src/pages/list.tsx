import { trpc } from "../utils/trpc";

export default function List() {
  const people = trpc.people.getAll.useQuery();

  if (!people.data) {
    return <div>Loading</div>;
  }

  return (
    <div className="mx-4 my-6 text-center">
      {people.data.map((person) => (
        <div>
          {person.name} tiene {person.chosenName ?? "Nadie"}
        </div>
      ))}
    </div>
  );
}
