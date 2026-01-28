import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPin, Heart, Users, Clock } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
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
 
export default Post;