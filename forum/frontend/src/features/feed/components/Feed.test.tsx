import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import Feed from "./Feed"



vi.mock("./Post", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="post">{title}</div>
  ),
}))


vi.mock("@/lib/api", () => ({
  fetcher: vi.fn(),
}))


vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}))

import { useQuery } from "@tanstack/react-query"

describe("Feed", () => {
  it("shows loading state", () => {
    ;(useQuery as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    })

    render(<Feed />)

    expect(screen.getByText("Loading feed...")).toBeInTheDocument()
  })

  it("shows error state", () => {
    ;(useQuery as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    })

    render(<Feed />)

    expect(
      screen.getByText("Error loading posts.")
    ).toBeInTheDocument()
  })

  it("shows empty state when no posts are found", () => {
    ;(useQuery as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    })

    render(<Feed />)

    expect(
      screen.getByText("No posts found. Be the first to post!")
    ).toBeInTheDocument()
  })

  it("renders a list of posts when data exists", () => {
    ;(useQuery as any).mockReturnValue({
      data: [
        { id: "1", title: "First Post" },
        { id: "2", title: "Second Post" },
      ],
      isLoading: false,
      error: null,
    })

    render(<Feed />)

    const posts = screen.getAllByTestId("post")
    expect(posts).toHaveLength(2)
    expect(screen.getByText("First Post")).toBeInTheDocument()
    expect(screen.getByText("Second Post")).toBeInTheDocument()
  })
})
