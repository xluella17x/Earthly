import { render, screen } from "@testing-library/react"
import SecondaryWrapper from "./SecondaryWrapper"

describe("SecondaryWrapper", () => {
  it("renders children", () => {
    render(
      <SecondaryWrapper>
        <p>Secondary content</p>
      </SecondaryWrapper>
    )

    expect(screen.getByText("Secondary content")).toBeInTheDocument()
  })

  it("applies default wrapper classes", () => {
    const { container } = render(
      <SecondaryWrapper>
        <span>Test</span>
      </SecondaryWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement
    const innerDiv = outerDiv.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("bg-secondary")
    expect(outerDiv).toHaveClass("text-secondary-foreground")
    expect(outerDiv).toHaveClass("p-1.5")
    expect(outerDiv).toHaveClass("rounded")

    expect(innerDiv).toHaveClass("bg-secondary")
    expect(innerDiv).toHaveClass("text-secondary-foreground")
    expect(innerDiv).toHaveClass("p-3")
    expect(innerDiv).toHaveClass("rounded")
  })

  it("merges custom className", () => {
    const { container } = render(
      <SecondaryWrapper className="border shadow">
        <span>Styled</span>
      </SecondaryWrapper>
    )

    const outerDiv = container.firstChild as HTMLElement

    expect(outerDiv).toHaveClass("border")
    expect(outerDiv).toHaveClass("shadow")
    expect(outerDiv).toHaveClass("bg-secondary")
  })
})
