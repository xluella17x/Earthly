import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPin, Heart, Users, Clock } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { POST_TYPE_COLORS } from "@/lib/constants"

function getRelativeTime(dateString: string | undefined) {
  if (!dateString) return "Just now"
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600)
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute")
  if (diffInSeconds < 86400)
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour")
  if (diffInSeconds < 604800)
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day")
  return date.toLocaleDateString("en-UK", { day: "numeric", month: "short" })
}

interface PostProps {
  id: string
  title?: string
  description?: string
  type?: "event" | "discussion" | "announcement"
  locationName?: string | null
  createdAt?: string
  likeCount?: number
  attendeeCount?: number
  isLikedByMe?: boolean
  isAttending?: boolean
}

const Post = ({
  id,
  title = "Untitled Post",
  description = "",
  type = "event",
  locationName,
  createdAt,
  likeCount = 0,
  attendeeCount = 0,
  isLikedByMe = false,
  isAttending = false,
}: PostProps) => {
  const queryClient = useQueryClient()

  const { mutate: toggleLike, isPending: isLiking } = useMutation({
    mutationFn: async () => fetcher(`/posts/${id}/like`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })

  const { mutate: toggleAttend, isPending: isAttendingLoading } = useMutation({
    mutationFn: async () => fetcher(`/posts/${id}/attend`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })

  const timeAgo = getRelativeTime(createdAt)
  const safeType =
    type && POST_TYPE_COLORS[type as keyof typeof POST_TYPE_COLORS]
      ? type
      : "event"

  return (
    <SecondaryCardWrapper>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold leading-tight">{title}</h3>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                POST_TYPE_COLORS[safeType as keyof typeof POST_TYPE_COLORS],
              )}
            >
              {safeType}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs  shrink-0">
            <Clock className="size-3" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {locationName && (
          <div className="flex items-center gap-1 text-sm ">
            <MapPin className="size-3.5" />
            <span>{locationName}</span>
          </div>
        )}

        <p className="text-sm whitespace-pre-wrap mt-1 text-card-foreground/90">
          {description}
        </p>

        </div>
      </div>
    </SecondaryCardWrapper>
  )
}

export default Post
