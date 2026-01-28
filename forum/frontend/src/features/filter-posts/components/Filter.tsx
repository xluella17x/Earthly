import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { POST_TYPE_COLORS, POST_TYPES } from "@/lib/constants"

interface FilterProps {
  currentFilter: string | undefined
  onFilterChange: (filter: string | undefined) => void
}

const Filter = ({ currentFilter, onFilterChange }: FilterProps) => {
  return (
    <SecondaryCardWrapper>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-semibold px-2 mb-2">Filter Posts</h3>
        <div className="flex flex-row gap-2 flex-wrap">
          <Button
            variant="secondary"
            className={cn(
              "h-8 px-3 text-xs  transition-colors",
              !currentFilter 
                ? "" 
                : "border-transparent bg-transparent"
            )}
          >
            All
          </Button>
        </div>
      </div>
    </SecondaryCardWrapper>
  )
}

export default Filter