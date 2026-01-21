import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavItemProps = {
  label: string
  href: string
}

function NavItem({ label, href }: NavItemProps) {
  return (
    <a href={href}>
      <div className={cn(buttonVariants(), "w-40 py-8")}>
        <span className="text-lg">{label}</span>
      </div>
    </a>
  )
}

export default NavItem
