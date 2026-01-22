import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import NavItem from "./NavItem"

const navItems = [
  { label: "Do Your Bit", href: "/do-your-bit" },
  { label: "Your Community", href: "/your-community" },
  { label: "Local Data", href: "/local-data" },
  { label: "Learn", href: "/learn" },
]

function NavBar() {
  return (
    <header className="w-full h-20 bg-secondary rounded items-center flex px-3">
      <nav className="flex gap-3">
        {navItems.map((item) => (
          <NavItem key={item.href} label={item.label} href={item.href} />
        ))}
      </nav>
    </header>
  )
}
export default NavBar
