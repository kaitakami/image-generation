"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import encodeSpecialChars from "@/utils/encodeSpecialChars"
import Link from "next/link"

export default function Home() {
  const [guest, setGuest] = useState({
    name: "",
    role: "",
    image: "",
  })
  const [result, setResult] = useState('')
  const router = useRouter()

  useEffect(() => {
    setResult(`/api/thumbnail?guest=${guest.name}&role=${guest.role}&image=${guest.image}`)
  }, [guest])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuest({
      ...guest,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/api/thumbnail?guest=${encodeSpecialChars(guest.name)}&role=${encodeSpecialChars(guest.role)}&image=${encodeSpecialChars(guest.image)}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-10 sm:pb-28 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-700">
      <main className="w-full max-w-2xl p-3 mx-auto space-y-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl scroll-m-20 lg:text-5xl dark:text-white">Thumbnail Generator <br />Fundadores Podcast</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la invitada o del invitado</label>
            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Naval Ravikant" onChange={handleInputChange} value={guest.name} required />
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
            <input type="text" name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Co-founder y CEO de AngelList" onChange={handleInputChange} value={guest.role} required />
          </div>
          <div>
            <label htmlFor="image" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">URL de la imagen<Link href="https://postimages.org/" target="_blank" className="my-auto ml-auto text-xs font-normal underline hover:text-blue-800 dark:hover:text-blue-200">Sube tu imagen y pega la URL aquí</Link></label>
            <input type="url" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://i.postimg.cc/HWKRrWPS/fundadores-logo.png"
              onChange={handleInputChange} value={guest.image} />
          </div>
          <div>
            <label htmlFor="result" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resultado</label>
            <input type="text" name="result" id="result" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={result} disabled />
          </div>
          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver resultado</button>
        </form>
      </main>
    </div>
  )
}
