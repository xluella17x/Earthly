import { render, screen } from "@testing-library/react"
import NavBar from "./Navbar"
import { vi } from "vitest"


vi.mock("./NavItem", () => ({
  default: ({ label, href }: { label: string; href: string }) => (
    <a href={href}>{label}</a>
  ),
}))

describe("NavBar", () => {
  it("renders all navigation items", () => {
    render(<NavBar />)

    expect(screen.getByText("Do Your Bit")).toBeInTheDocument()
    expect(screen.getByText("Your Community")).toBeInTheDocument()
    expect(screen.getByText("Local Data")).toBeInTheDocument()
    expect(screen.getByText("Learn")).toBeInTheDocument()
  })

  it("renders navigation links with correct hrefs", () => {
    render(<NavBar />)

    expect(screen.getByText("Do Your Bit")).toHaveAttribute(
      "href",
      "/do-your-bit"
    )
    expect(screen.getByText("Your Community")).toHaveAttribute(
      "href",
      "/your-community"
    )
    expect(screen.getByText("Local Data")).toHaveAttribute(
      "href",
      "/local-data"
    )
    expect(screen.getByText("Learn")).toHaveAttribute("href", "/learn")
  })

  it("renders the logo image with correct attributes", () => {
    render(<NavBar />)

    const logo = screen.getByAltText("Logo")

    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "logo.png")
  })

  it("wraps content in semantic header and nav elements", () => {
    const { container } = render(<NavBar />)

    expect(container.querySelector("header")).toBeInTheDocument()
    expect(container.querySelector("nav")).toBeInTheDocument()
  })
})
