import React from 'react'

type cardProps = {
  children: React.ReactNode
  header?: string
}

export default function Card({ header, children }: cardProps) {
  return (
    <div className=" flex items-center mt-4">
      <div className="border-2 border-gray-300 rounded-sm shadow-lg p-5 bg-white">
        <h1 className="text-3xl font-medium text-center text-black">
          {header}
        </h1>
        <div className="flex justify-center p-10 mb-5 rounded-md bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}
