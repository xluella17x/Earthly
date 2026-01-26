import { render, screen } from "@testing-library/react"
import NavItem from "./NavItem"
import { vi } from "vitest"


vi.mock("@/components/ui/button", () => ({
  buttonVariants: vi.fn(() => "mock-button-classes"),
}))

vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.join(" "),
}))

describe("NavItem", () => {
  const label = "Do Your Bit"
  const href = "/do-your-bit"

  it("renders the label text", () => {
    render(<NavItem label={label} href={href} />)

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it("renders a link with the correct href", () => {
    render(<NavItem label={label} href={href} />)

    const link = screen.getByRole("link")

    expect(link).toHaveAttribute("href", href)
  })

  it("applies button variant classes", () => {
    render(<NavItem label={label} href={href} />)

    const wrapper = screen.getByText(label).closest("div")

    expect(wrapper).toHaveClass("mock-button-classes")
    expect(wrapper).toHaveClass("w-40")
    expect(wrapper).toHaveClass("py-8")
  })
})