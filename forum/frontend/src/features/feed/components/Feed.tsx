import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import Post from "./Post"

interface FeedProps {
  filter?: string
}

const Feed = ({ filter }: FeedProps) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", filter],
    queryFn: () => {
      const queryParams = filter ? `?type=${filter}` : ""
      return fetcher(`/posts${queryParams}`)
    },
  })

  return (
  )
}

export default Feed
