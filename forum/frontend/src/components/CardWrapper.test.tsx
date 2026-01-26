import { render, screen } from "@testing-library/react"
import CardWrapper from "./CardWrapper"

describe("CardWrapper", () => {
  it("renders children correctly", () => {
    render(
      <CardWrapper>
        <p>Hello World</p>
      </CardWrapper>
    )

    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  it("applies default wrapper classes", () => {
    const { container } = render(
      <CardWrapper>
        <span>Content</span>
      </CardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement
    const innerDiv = outerDiv.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("bg-card", "text-card-foreground", "p-1.5", "rounded")
    expect(innerDiv).toHaveClass("bg-card", "text-card-foreground", "p-3", "rounded")
  })

  it("merges custom className with default classes", () => {
    const { container } = render(
      <CardWrapper className="shadow-lg border">
        <span>Styled</span>
      </CardWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("shadow-lg")
    expect(outerDiv).toHaveClass("border")
    expect(outerDiv).toHaveClass("bg-card")
  })
})
