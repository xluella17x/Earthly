import { render, screen } from "@testing-library/react"
import Post from "./Post"

describe("Post", () => {
  it("renders the Post component text", () => {
    render(<Post />)

    expect(screen.getByText("Post Component")).toBeInTheDocument()
  })
})