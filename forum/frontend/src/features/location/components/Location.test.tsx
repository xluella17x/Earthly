import { render, screen } from "@testing-library/react"
import Location from "./Location"
import { vi } from "vitest"


vi.mock("@/components/SecondaryWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="secondary-wrapper">{children}</div>
  ),
}))

describe("Location", () => {
  it("renders the community label", () => {
    render(<Location />)

    expect(screen.getByText("Your Community:")).toBeInTheDocument()
  })

  it("renders the user location", () => {
    render(<Location />)

    expect(screen.getByText("Victoria")).toBeInTheDocument()
  })

  it("wraps content in SecondaryWrapper", () => {
    render(<Location />)

    expect(screen.getByTestId("secondary-wrapper")).toBeInTheDocument()
  })
})
