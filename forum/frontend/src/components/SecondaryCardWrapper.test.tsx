import { render, screen } from "@testing-library/react"
import SecondaryCardWrapper from "./SecondaryCardWrapper"

describe("SecondaryCardWrapper", () => {
  it("renders children", () => {
    render(
      <SecondaryCardWrapper>
        <p>Secondary content</p>
      </SecondaryCardWrapper>
    )

    expect(screen.getByText("Secondary content")).toBeInTheDocument()
  })

  it("applies default wrapper classes", () => {
    const { container } = render(
      <SecondaryCardWrapper>
        <span>Test</span>
      </SecondaryCardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement
    const innerDiv = outerDiv.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("bg-secondary")
    expect(outerDiv).toHaveClass("text-secondary-foreground")
    expect(outerDiv).toHaveClass("p-1.5")
    expect(outerDiv).toHaveClass("rounded")

    expect(innerDiv).toHaveClass("bg-card")
    expect(innerDiv).toHaveClass("text-card-foreground")
    expect(innerDiv).toHaveClass("p-3")
    expect(innerDiv).toHaveClass("rounded")
  })

  it("merges custom className", () => {
    const { container } = render(
      <SecondaryCardWrapper className="shadow-lg border">
        <span>Styled</span>
      </SecondaryCardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("shadow-lg")
    expect(outerDiv).toHaveClass("border")
    expect(outerDiv).toHaveClass("bg-secondary")
  })
})
