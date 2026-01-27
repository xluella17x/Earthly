export const API_URL = "https://zgs4fmqc-5174.uks1.devtunnels.ms"

export async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${url}`, options)
  
  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "Something went wrong")
  }
  
  return res.json()
}