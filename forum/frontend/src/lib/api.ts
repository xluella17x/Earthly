export const API_URL = import.meta.env.VITE_API_URL

export async function fetcher(url: string, options?: RequestInit) {
// ensure no double slashes if env variable ends with slash
  const baseUrl = API_URL.replace(/\/$/, "")
  const endpoint = url.startsWith("/") ? url : `/${url}`

  const res = await fetch(`${baseUrl}${endpoint}`, options)
  
  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "Something went wrong")
  }
  
  return res.json()
}