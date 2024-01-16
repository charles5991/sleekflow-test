import React from "react"

export default function MainSidebar({ id, imageUrl, name, species, onClick }) {
  const handleSelect = () => {
    onClick(id)
    console.log(id, "idddddd")
  }

  return (
    <div
      className="flex-1 block bg-white px-6 py-4 border-b cursor-pointer"
      onClick={handleSelect}
    >
      <div className="flex items-center">
        <div className="mr-4">
          <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          <span className="text-xs text-gray-600">{species}</span>
        </div>
      </div>
    </div>
  )
}
