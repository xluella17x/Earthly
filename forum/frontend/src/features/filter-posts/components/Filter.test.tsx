import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import Filter from "./Filter"




vi.mock("@/components/SecondaryCardWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="secondary-card">{children}</div>
  ),
}))


vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}))


vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.join(" "),
}))

vi.mock("@/lib/constants", () => ({
  POST_TYPES: [
    { label: "Post", value: "post" },
    { label: "Event", value: "event" },
  ],
  POST_TYPE_COLORS: {
    post: "bg-blue-500",
    event: "bg-green-500",
  },
}))

describe("Filter", () => {
  it("renders the filter title and buttons", () => {
    render(
      <Filter currentFilter={undefined} onFilterChange={vi.fn()} />
    )

    expect(screen.getByText("Filter Posts")).toBeInTheDocument()
    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Posts")).toBeInTheDocument()
    expect(screen.getByText("Events")).toBeInTheDocument()
  })

  it("calls onFilterChange with undefined when clicking All", async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()

    render(
      <Filter currentFilter="post" onFilterChange={onFilterChange} />
    )

    await user.click(screen.getByText("All"))

    expect(onFilterChange).toHaveBeenCalledWith(undefined)
  })

  it("calls onFilterChange with the correct value when clicking a filter", async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()

    render(
      <Filter currentFilter={undefined} onFilterChange={onFilterChange} />
    )

    await user.click(screen.getByText("Posts"))

    expect(onFilterChange).toHaveBeenCalledWith("post")
  })
})
