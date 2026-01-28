import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { POST_TYPE_COLORS, POST_TYPES } from "@/lib/constants"

interface FilterProps {
  currentFilter: string | undefined
  onFilterChange: (filter: string | undefined) => void
}
 
export default Filter;