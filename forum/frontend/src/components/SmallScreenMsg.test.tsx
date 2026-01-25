import { render, screen } from "@testing-library/react"
import SmallScreenMsg from "./SmallScreenMsg"
import { vi } from "vitest"


vi.mock("./SecondaryCardWrapper", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="secondary-card-wrapper" className={className}>
      {children}
    </div>
  ),
}))

describe("SmallScreenMsg", () => {
  it("renders the small screen warning message", () => {
    render(<SmallScreenMsg />)

    expect(
      screen.getByText(
        /this application is not optimised for small screens/i
      )
    ).toBeInTheDocument()
  })

  it("wraps content in SecondaryCardWrapper", () => {
    render(<SmallScreenMsg />)

    expect(
      screen.getByTestId("secondary-card-wrapper")
    ).toBeInTheDocument()
  })

  it("passes className to SecondaryCardWrapper", () => {
    render(<SmallScreenMsg className="custom-class" />)

    const wrapper = screen.getByTestId("secondary-card-wrapper")

    expect(wrapper).toHaveClass("custom-class")
  })
})
