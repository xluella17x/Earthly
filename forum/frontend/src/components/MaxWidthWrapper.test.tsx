import { render, screen } from "@testing-library/react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { vi } from "vitest"


vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

describe("MaxWidthWrapper", () => {
  it("renders children", () => {
    render(
      <MaxWidthWrapper>
        <p>Content</p>
      </MaxWidthWrapper>
    )

    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("applies base layout classes", () => {
    const { container } = render(
      <MaxWidthWrapper>
        <span>Test</span>
      </MaxWidthWrapper>
    )

    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toHaveClass("mx-auto")
    expect(wrapper).toHaveClass("max-w-screen-xl")
  })

  it("merges custom className", () => {
    const { container } = render(
      <MaxWidthWrapper className="bg-red-500">
        <span>Styled</span>
      </MaxWidthWrapper>
    )

    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toHaveClass("bg-red-500")
    expect(wrapper).toHaveClass("mx-auto")
  })
})
