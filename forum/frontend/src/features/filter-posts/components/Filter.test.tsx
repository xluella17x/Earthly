import { render, screen } from "@testing-library/react"
import Filter from "./Filter"
import { vi } from "vitest"

vi.mock("@/components/SecondaryCardWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="secondary-card-wrapper">{children}</div>
  ),
}))

describe("Filter", () => {
  it("renders filter content", () => {
    render(<Filter />)

    expect(screen.getByText("Filter")).toBeInTheDocument()
  })

  it("wraps content in SecondaryCardWrapper", () => {
    render(<Filter />)

    expect(
      screen.getByTestId("secondary-card-wrapper")
    ).toBeInTheDocument()
  })
})
