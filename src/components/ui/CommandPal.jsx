import React, { useState } from "react";

import {
  Dialog,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { SearchIcon } from "lucide-react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];
const CommandPal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Dialog
      className="fixed inset-0 pt-[24vh] p-4 overflow-y-auto"
      open={isOpen}
      onClose={() => {
        setIsOpen(setIsOpen);
      }}
    >
      {/* <Dialog.Overlay className="fixed inset-0 bg-gray-500/75"/> */}
      <Combobox
        onChange={() => {}}
        className="relative rounded-xl shadow-2xl ring-1 ring-black/5 max-w-xl mx-auto bg-white"
      >
        <div className="flex items-center px-4">
          <SearchIcon className="h-6 w-6 text-gray-500" />
          <ComboboxInput
            onChange={() => {}}
            className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400 h-12"
            placeholder="search..."
          />
        </div>
        <ComboboxOptions static>
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="data-[focus]:bg-blue-100"
            >
              {person.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Dialog>
  );
};

export default CommandPal;
