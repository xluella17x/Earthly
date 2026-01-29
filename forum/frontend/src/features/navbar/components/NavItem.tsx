import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavItemProps = {
  label: string
  href: string
  isActive?: boolean
}

function NavItem({ label, href, isActive }: NavItemProps) {
  return (
    <a href={href}>
      <div
        className={cn(
          buttonVariants({ variant: "card" }),
          "w-40 py-8 whitespace-break-spaces transition-colors duration-200",
          isActive ? "border-primary/20" : "bg-card/60 hover:bg-card",
        )}
      >
        <span className="text-lg font-medium text-center">{label}</span>
      </div>
    </a>
  )
}

export default NavItem
