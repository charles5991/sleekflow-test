import React from "react"

export default function MenuItem({ active }) {
  return (
    <a
      href="/"
      className={`mt-3 text-sm font-medium flex justify-between rounded-lg -mx-3 px-3 py-2 hover:bg-gray-200 ${
        active ? "bg-gray-300" : ""
      }`}
    >
      <span className="flex items-center">
        <span className="ml-3">Contact</span>
      </span>
    </a>
  )
}
