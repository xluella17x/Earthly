import { render, screen } from "@testing-library/react"
import CreatePostForm from "./CreatePostForm"
import { vi } from "vitest"
import React from "react"


vi.mock("@/components/SecondaryMutedCardWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="secondary-muted-card-wrapper">{children}</div>
  ),
}))

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}))

describe("CreatePostForm", () => {
  it("renders the form wrapper", () => {
    render(<CreatePostForm />)

    expect(
      screen.getByTestId("secondary-muted-card-wrapper")
    ).toBeInTheDocument()
  })

  it("renders the post title input", () => {
    render(<CreatePostForm />)

    expect(
      screen.getByPlaceholderText("Post Title")
    ).toBeInTheDocument()
  })

  it("renders post type buttons", () => {
    render(<CreatePostForm />)

    expect(screen.getByRole("button", { name: "Event" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Win" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Tip" })).toBeInTheDocument()
  })

  it("renders the post details textarea", () => {
    render(<CreatePostForm />)

    expect(
      screen.getByPlaceholderText(
        "Write more details about your post here..."
      )
    ).toBeInTheDocument()
  })

  it("renders the submit button", () => {
    render(<CreatePostForm />)

    expect(
      screen.getByRole("button", { name: "Create Post" })
    ).toBeInTheDocument()
  })
})