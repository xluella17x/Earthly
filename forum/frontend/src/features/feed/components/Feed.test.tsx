import { render, screen } from "@testing-library/react"
import Feed from "./Feed"
import { vi } from "vitest"


vi.mock("@/components/SecondaryWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="secondary-wrapper">{children}</div>
  ),
}))

describe("Feed", () => {
  it("renders the feed wrapper", () => {
    render(<Feed />)

    expect(screen.getByTestId("secondary-wrapper")).toBeInTheDocument()
  })

  it("renders a heading element", () => {
    render(<Feed />)

    const heading = screen.getByRole("heading", { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("") 
  })
})
