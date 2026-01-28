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
          {POST_TYPES.map((t) => {
            const isSelected = type === t.value
            return (
              <Button
                key={t.value}
                type="button"
                variant="ghost"
                onClick={() => setType(t.value)}
                className={cn(
                  "flex-1 border transition-all duration-200",
                  isSelected
                    ? POST_TYPE_COLORS[t.value as keyof typeof POST_TYPE_COLORS]
                    : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
                )}
              >
                {t.label}
              </Button>
            )
          })}
        </div>
        <textarea
          className="rounded-lg p-2 bg-card text-card-foreground"
          placeholder="Write more details about your post here..."
          rows={6}
        />
        <Button variant={"secondary"} type="submit">
          Create Post
              <MapPin
                className={cn(
                  "absolute left-3 size-4",
                  isTouched && !isLocationValid
                    ? "text-red-500"
                    : "",
                )}
              />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value)
                  if (selectedLocation) setSelectedLocation(null)
                }}
                className={cn(
                  "w-full rounded-lg py-2 pl-9 pr-10 bg-card text-card-foreground border focus:border-ring outline-none transition-colors",
                  isTouched && !isLocationValid
                    ? "border-red-500"
                    : "border-transparent",
                )}
                placeholder="Search area (e.g. Victoria)"
              />

                {isSearching && (
                  <Loader2 className="size-3 animate-spin" />
                )}

                {locationQuery && !isSearching && (
                  <button
                    type="button"
                    onClick={clearLocation}
                    className="p-1 hover:bg-muted rounded-full"
                  >
                    <X className="size-3" />
                  </button>
                )}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                {searchResults.map((result, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground truncate border-b last:border-0"
                    onClick={() => selectLocation(result)}
                  >
                    {result.display_name}
                  </button>
                ))}
              </div>
            )}
          {isTouched && !isLocationValid && (
            <span className="text-xs text-red-500 px-1">
              Please select a location from the search or use GPS
            </span>
          )}
        <div className="flex flex-col gap-1">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={cn(
              "rounded-lg p-2 bg-card text-card-foreground border focus:border-ring outline-none transition-colors",
              isTouched && !isDescValid
                ? "border-red-500"
                : "border-transparent",
            )}
            placeholder="Write details... (min 5 chars)"
            rows={6}
          />
          {isTouched && !isDescValid && (
            <span className="text-xs text-red-500 px-1">
              Description must be at least 5 characters
            </span>
          )}
        </div>

        <Button variant="secondary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Create Post"}
        </Button>
      </form>
    </SecondaryMutedCardWrapper>
  )
}

export default CreatePostForm
