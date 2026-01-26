import { render, screen } from "@testing-library/react"
import SecondaryMutedCardWrapper from "./SecondaryMutedCardWrapper"

describe("SecondaryMutedCardWrapper", () => {
  it("renders children", () => {
    render(
      <SecondaryMutedCardWrapper>
        <p>Muted secondary content</p>
      </SecondaryMutedCardWrapper>
    )

    expect(screen.getByText("Muted secondary content")).toBeInTheDocument()
  })

  it("applies default wrapper classes", () => {
    const { container } = render(
      <SecondaryMutedCardWrapper>
        <span>Test</span>
      </SecondaryMutedCardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement
    const innerDiv = outerDiv.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("bg-secondary")
    expect(outerDiv).toHaveClass("text-secondary-foreground")
    expect(outerDiv).toHaveClass("p-1.5")
    expect(outerDiv).toHaveClass("rounded")

    expect(innerDiv).toHaveClass("bg-card/50")
    expect(innerDiv).toHaveClass("text-card-foreground")
    expect(innerDiv).toHaveClass("p-3")
    expect(innerDiv).toHaveClass("rounded")
  })

  it("merges custom className", () => {
    const { container } = render(
      <SecondaryMutedCardWrapper className="border shadow-sm">
        <span>Styled</span>
      </SecondaryMutedCardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("border")
    expect(outerDiv).toHaveClass("shadow-sm")
    expect(outerDiv).toHaveClass("bg-secondary")
  })
})
