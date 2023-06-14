import Link from 'next/link'
import React from 'react'

export type IErrorPageProps = {
    error: string
}

const ErrorPage = ({error}: IErrorPageProps) => {

  return (
    <div className="flex items-center justify-center h-screen bg-slate-400">
        <div id="error-page">
          <h1 className="text-2xl font-bold text-white lg:text-6xl">Oops!</h1>
          <p className="text-xl text-white">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-3xl text-white">{error}</p>
          <div className="mt-4">
            <Link
              href="/"
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ErrorPage