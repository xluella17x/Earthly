import SecondaryMutedCardWrapper from "@/components/SecondaryMutedCardWrapper"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"
import { cn } from "@/lib/utils"
import { POST_TYPE_COLORS, POST_TYPES } from "@/lib/constants"
import { MapPin, Loader2, X, Navigation } from "lucide-react"

const CreatePostForm = () => {
  const [postType, setPostType] = useState("Event")
  const types = ["Event", "Win", "Tip"]

  return (
    <SecondaryMutedCardWrapper>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "rounded-lg p-2 bg-card text-card-foreground border focus:border-ring outline-none transition-colors",
              isTouched && !isTitleValid
                ? "border-red-500"
                : "border-transparent",
            )}
            placeholder="Post Title (min 5 chars)"
          />
          {isTouched && !isTitleValid && (
            <span className="text-xs text-red-500 px-1">
              Title must be at least 5 characters
            </span>
          )}
        </div>

        <div className="flex gap-2">
        </div>
        <textarea
          className="rounded-lg p-2 bg-card text-card-foreground"
          placeholder="Write more details about your post here..."
          rows={6}
        />
        <Button variant={"secondary"} type="submit">
          Create Post
        </Button>
      </form>
    </SecondaryMutedCardWrapper>
  )
}

export default CreatePostForm
