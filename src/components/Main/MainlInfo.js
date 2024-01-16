import React from "react"

export default function MainlInfo({ characterDetails }) {
  if (!characterDetails) {
    return (
      <div className="flex gap-8 justify-evenly bg-white px-4 py-16">
        <h1 className="text-2xl font-semibold">
          Select a character to display info
        </h1>
      </div>
    )
  }

  return (
    <div className="flex gap-8 justify-start bg-white  px-8 py-16 items-center">
      <img
        src={characterDetails.image}
        alt={characterDetails.name}
        className="rounded-full h-20 w-20 object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold">{characterDetails.name}</h1>
      </div>
    </div>
  )
}
