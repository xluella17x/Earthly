import NavItem from "./NavItem"

const navItems = [
  { label: "Do Your Bit", href: "/do-your-bit" },
  { label: "Your Community", href: "/your-community", isActive: true },
  { label: "Local Data", href: "/local-data" },
  { label: "Learn", href: "/learn" },
]

function NavBar() {
  return (
    <header className="w-full h-20 bg-secondary rounded items-center flex px-3">
      <nav className="flex justify-between w-full items-center">
        <div className="flex gap-3">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
            />
          ))}
        </div>
        <a href="/">
          <img src="logo.png" alt="Logo" className="size-20 object-contain" />
        </a>
      </nav>
    </header>
  )
}
export default NavBar
