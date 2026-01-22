import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"
import NavItem from "./NavItem"

function NavBar() {
  return (
    <header className="w-full h-20">
      <SecondaryCardWrapper className="h-full">
        <MaxWidthWrapper className="flex flex-row justify-between items-center w-full">
          <nav className="flex gap-2 items-center">
            <NavItem label="Do Your Bit" href="do-your-bit" />
            <NavItem label="Your Community" href="your-community" />
            <NavItem label="Local Data" href="local-data" />
            <NavItem label="Learn" href="learn" />
          </nav>
          <a href="/">
            <img src="logo.png" alt="Logo" className="size-20 object-contain" />
          </a>
        </MaxWidthWrapper>
      </SecondaryCardWrapper>
    </header>
  )
}
export default NavBar
