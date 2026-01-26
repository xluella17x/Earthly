import { render, screen } from "@testing-library/react"
import MutedCardWrapper from "./MutedCardWrapper"

describe("MutedCardWrapper", () => {
  it("renders children", () => {
    render(
      <MutedCardWrapper>
        <p>Muted content</p>
      </MutedCardWrapper>
    )

    expect(screen.getByText("Muted content")).toBeInTheDocument()
  })

  it("applies default wrapper classes", () => {
    const { container } = render(
      <MutedCardWrapper>
        <span>Test</span>
      </MutedCardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement
    const innerDiv = outerDiv.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("bg-card/50")
    expect(outerDiv).toHaveClass("p-1.5")
    expect(innerDiv).toHaveClass("p-3")
  })

  it("merges custom className", () => {
    const { container } = render(
      <MutedCardWrapper className="border border-red-500">
        <span>Styled</span>
      </MutedCardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("border")
    expect(outerDiv).toHaveClass("border-red-500")
    expect(outerDiv).toHaveClass("bg-card/50")
  })
})
