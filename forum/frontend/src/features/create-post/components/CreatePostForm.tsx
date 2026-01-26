import SecondaryMutedCardWrapper from "@/components/SecondaryMutedCardWrapper"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
