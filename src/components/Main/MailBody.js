import React, { useState, useEffect } from "react"
import Female from "../../assets/images/female.png"
import Male from "../../assets/images/male.png"
import Nogender from "../../assets/images/nogender.png"
import axios from "axios"
import Table from "rc-table"
import Pagination from "rc-pagination"
import "rc-table/assets/index.css"
import "rc-pagination/assets/index.css"

export default function MailBody({ characterDetails }) {
  const [episodesData, setEpisodesData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        if (!characterDetails || !characterDetails.episode) {
          return
        }

        const episodePromises = characterDetails.episode.map(episodeUrl =>
          axios.get(episodeUrl)
        )

        const episodesData = await Promise.all(episodePromises)
        setEpisodesData(episodesData.map(response => response.data))
      } catch (error) {
        console.error("Error fetching episode data:", error)
      }
    }

    fetchEpisodeData()
  }, [characterDetails])

  if (!characterDetails) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    )
  }

  const { status, gender, species, location, origin, created } =
    characterDetails

  const getGenderImage = () => {
    if (gender.toLowerCase() === "male") {
      return Male
    } else if (gender.toLowerCase() === "female") {
      return Female
    } else {
      return Nogender
    }
  }

  const formatCreatedDate = () => {
    const date = new Date(created)
    return date.toLocaleDateString()
  }

  const columns = [
    {
      title: "Episode",
      dataIndex: "episode",
      key: "episode",
      sorter: (a, b) => a.episode.localeCompare(b.episode)
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Air Date",
      dataIndex: "air_date",
      key: "air_date",
      sorter: (a, b) => a.air_date.localeCompare(b.air_date)
    },
    {
      title: "Created Date",
      dataIndex: "created",
      key: "created",
      sorter: (a, b) => new Date(a.created) - new Date(b.created),
      render: (text, record) => {
        const date = new Date(record.created)
        return date.toLocaleDateString()
      }
    }
  ]

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  const paginatedData = episodesData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  return (
    <div>
      <h1 className="p-8 font-semibold text-2xl  mb-6 rounded-t-md">
        Personal Info
      </h1>
      <div className="p-8 bg-white m-2 shadow-md rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div class="mx-auto max-w-xl lg:px-2">
            <div class="mx-auto grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div>
                <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Status:
                </h2>
                <p class="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-md">
                  {status}
                </p>
              </div>
              <div>
                <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Gender:
                </h2>
                <img
                  className="mt-4 h-8 rounded-full mx-auto"
                  src={getGenderImage()}
                  alt={`${gender} avatar`}
                />
              </div>
              <div>
                <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Species:
                </h2>
                <p class="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-md">
                  {species}
                </p>
              </div>
              <div>
                <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Location:
                </h2>
                <p class="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-md">
                  {location.name}
                </p>
              </div>
              <div>
                <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Origin :
                </h2>
                <p class="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-md">
                  {origin.name}
                </p>
              </div>
              <div>
                <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Created Date :
                </h2>
                <p class="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-md">
                  {formatCreatedDate()}
                </p>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <h1 className="p-8 font-semibold text-2xl  mb-6 rounded-t-md">
        Episodes
      </h1>
      <div className="p-8 bg-white m-2 shadow-md rounded-md">
        {episodesData.length === 0 ? (
          <p>No episode data available</p>
        ) : (
          <div className="flex flex-col gap-4">
            <Table
              columns={columns}
              data={paginatedData}
              rowKey={record => record.episode}
              pagination={false}
              className="w-full border border-gray-300"
            />
            <div className="text-center mx-auto">
              {" "}
              <Pagination
                total={episodesData.length}
                current={currentPage}
                pageSize={pageSize}
                onChange={onPageChange}
                showSizeChanger
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
