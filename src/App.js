import React, { Fragment, useState, useEffect } from "react"
import axios from "axios"
// import "./styles/build.css"
import qs from "qs"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

import MenuItem from "./components/Sidebar/MenuItem"
import MainSidebar from "./components/Main/MainSidebar"
import MainlInfo from "./components/Main/MainlInfo"
import MailBody from "./components/Main/MailBody"

const statusOption = [
  { name: "All", value: "" },
  { name: "Alive", value: "alive" },
  { name: "Dead", value: "dead" }
]
const genderOption = [
  { name: "All", value: "" },
  { name: "Male", value: "male" },
  { name: "Female", value: "female" }
]

export default function App() {
  const [characters, setCharacters] = useState([])
  const [selected, setSelected] = useState(statusOption[0])
  const [gender, setGender] = useState(genderOption[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [characterDetails, setCharacterDetails] = useState(null)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const queryParams = qs.stringify({
          status: selected.value,
          gender: gender.value,
          name: searchQuery
        })

        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?${queryParams}`
        )
        setCharacters(response.data.results)
      } catch (error) {
        console.error("Error fetching characters:", error)
      }
    }

    fetchCharacters()
  }, [selected.value, gender.value, searchQuery])

  const handleSearch = async () => {
    try {
      const queryParams = qs.stringify({
        status: selected.value,
        gender: gender.value,
        name: searchQuery
      })

      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?${queryParams}`
      )

      setCharacters(response.data.results)
    } catch (error) {
      console.error("Error fetching characters:", error)
    }
  }

  const handleClick = async id => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      )
      const characterDetails = response.data
      setCharacterDetails(characterDetails)
    } catch (error) {
      console.error("Error fetching character details:", error)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-gray-100 p-6 overflow-y-auto">
          <nav>
            <h2 className="text-xs font-semibold text-gray-600 uppercase">
              Rick and Morty
            </h2>
            <div className="mt-2">
              <MenuItem active />
            </div>
          </nav>
        </div>
        <main className="flex bg-gray-200 flex-1">
          <div className="flex-grow w-full max-w-xs bg-gray-200 border-l border-r border-b flex flex-col">
            <div className="flex-shrink-0 px-2 py-8 items-center gap-8 flex-col bg-white">
              <p className="px-3 font-semibold text-xl">Contact</p>
              <div className="relative m-4">
                <input
                  placeholder="Find Your Series"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="px-3 py-2 w-48 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring focus:border-indigo-700"
                >
                  Search
                </button>
              </div>
              <div className="flex gap-6 flex-row">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-none  py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {statusOption.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <Listbox value={gender} onChange={setGender}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-none  py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{gender.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {genderOption.map((sex, sexIdx) => (
                          <Listbox.Option
                            key={sexIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={sex}
                          >
                            {({ gender }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    gender ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {sex.name}
                                </span>
                                {gender ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden">
              {characters.length === 0 ? (
                <div className="p-4 text-center text-gray-600">
                  Contact not found
                </div>
              ) : (
                characters.map(character => (
                  <MainSidebar
                    key={character.id}
                    id={character.id}
                    imageUrl={character.image}
                    name={character.name}
                    statusOption={character.statusOption}
                    onClick={handleClick}
                  />
                ))
              )}
            </div>
          </div>
          <div className="flex-1 w-0 flex-col flex">
            <div className="shadow-md relative">
              <MainlInfo characterDetails={characterDetails} />
            </div>
            <div className="overflow-y-auto flex-1">
              <MailBody characterDetails={characterDetails} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
