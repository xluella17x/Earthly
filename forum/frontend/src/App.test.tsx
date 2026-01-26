import { render, screen } from "@testing-library/react"
import App from "./App"
import { vi } from "vitest"

vi.mock("./features/navbar/components/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}))

vi.mock("./components/SmallScreenMsg", () => ({
  default: () => <div data-testid="small-screen-msg">Small Screen</div>,
}))

vi.mock("./components/MaxWidthWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="max-width-wrapper">{children}</div>
  ),
}))

vi.mock("./features/location/components/Location", () => ({
  default: () => <div data-testid="location">Location</div>,
}))

vi.mock("./features/feed/components/Feed", () => ({
  default: () => <div data-testid="feed">Feed</div>,
}))

vi.mock("./features/create-post/components/CreatePostForm", () => ({
  default: () => <div data-testid="create-post">Create Post</div>,
}))

vi.mock("./features/filter-posts/components/Filter", () => ({
  default: () => <div data-testid="filter">Filter</div>,
}))


// Tests
describe("App", () => {
  it("renders the app shell", () => {
    render(<App />)

    expect(screen.getByTestId("max-width-wrapper")).toBeInTheDocument()
  })

  it("renders navigation and main content components", () => {
    render(<App />)

    expect(screen.getByTestId("navbar")).toBeInTheDocument()
    expect(screen.getByTestId("location")).toBeInTheDocument()
    expect(screen.getByTestId("feed")).toBeInTheDocument()
    expect(screen.getByTestId("create-post")).toBeInTheDocument()
    expect(screen.getByTestId("filter")).toBeInTheDocument()
  })

  it("renders the small screen message", () => {
    render(<App />)

    expect(screen.getByTestId("small-screen-msg")).toBeInTheDocument()
  })
})