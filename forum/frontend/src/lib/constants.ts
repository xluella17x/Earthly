export const POST_TYPE_COLORS = {
  event: "bg-blue-200 text-blue-700 border-blue-300 hover:bg-blue-300",
  discussion: "bg-purple-200 text-purple-700 border-purple-300 hover:bg-purple-300",
  announcement: "bg-orange-200 text-orange-700 border-orange-300 hover:bg-orange-300",
} as const

export const POST_TYPES = [
  { label: "Event", value: "event" },
  { label: "Discussion", value: "discussion" },
  { label: "Announcement", value: "announcement" },
] as const