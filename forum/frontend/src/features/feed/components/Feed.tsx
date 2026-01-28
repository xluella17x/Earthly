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

  if (isLoading) return <div className="text-center p-8">Loading feed...</div>
  if (error) return <div className="text-destructive p-8">Error loading posts.</div>

  return (
    <div className="flex flex-col gap-4">
      {posts?.length === 0 && (
        <div className="text-center py-10">
          No posts found. Be the first to post!
        </div>
      )}

  )
}

export default Feed
