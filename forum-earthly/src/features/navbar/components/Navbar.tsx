import NavItem from "./NavItem"

function NavBar() {
  return (
    <header className="">
      <nav>
        <NavItem label="Do Your Bit" id="do-your-bit" />
        <NavItem label="Your Community" id="your-community" />
        <NavItem label="Local Data" id="local-data" />
        <NavItem label="Learn" id="learn" />
      </nav>
    </header>
  )
}
export default NavBar
