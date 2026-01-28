import SecondaryMutedCardWrapper from "@/components/SecondaryMutedCardWrapper"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetcher } from "@/lib/api"

const POST_TYPES = [
  { label: "Event", value: "event" },
  { label: "Win", value: "discussion" },
  { label: "Tip", value: "announcement" },
]

const CreatePostForm = () => {
  const [postType, setPostType] = useState("Event")
  const types = ["Event", "Win", "Tip"]

  return (
    <SecondaryMutedCardWrapper>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="rounded-lg p-2 bg-card text-card-foreground"
          placeholder="Post Title"
        />
        {/* i want it to say post type as like a heading i guess and then you can select event, win or tip as like buttons rather than drop down and the selected one shows different color to others*/}
        <div className="flex gap-2">
          <Button variant={"secondary"}>Event</Button>
          <Button variant={"secondary"}>Win</Button>
          <Button variant={"secondary"}>Tip</Button>
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
