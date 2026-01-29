import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import CreatePostForm from "./CreatePostForm"



vi.mock("@/components/SecondaryMutedCardWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}))

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    type = "button",
    disabled,
  }: any) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}))

vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

vi.mock("@/lib/constants", () => ({
  POST_TYPES: [
    { label: "Event", value: "event" },
    { label: "Discussion", value: "discussion" },
  ],
  POST_TYPE_COLORS: {
    event: "bg-blue-500",
    discussion: "bg-green-500",
  },
}))

const mutateMock = vi.fn()
const invalidateMock = vi.fn()

vi.mock("@tanstack/react-query", () => ({
  useMutation: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
  useQueryClient: () => ({
    invalidateQueries: invalidateMock,
  }),
}))

vi.mock("@/lib/api", () => ({
  fetcher: vi.fn(),
}))

vi.mock("lucide-react", () => ({
  MapPin: () => <span>MapPin</span>,
  Loader2: () => <span>Loader</span>,
  X: () => <span>X</span>,
  Navigation: () => <span>Nav</span>,
}))


describe("CreatePostForm", () => {
  beforeEach(() => {
    mutateMock.mockClear()
    invalidateMock.mockClear()
    vi.restoreAllMocks()
  })

  it("renders the form fields", () => {
    render(<CreatePostForm />)

    expect(screen.getByPlaceholderText(/Post Title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Write details/i)).toBeInTheDocument()
    expect(screen.getByText("Create Post")).toBeInTheDocument()
  })

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup()
    render(<CreatePostForm />)

    await user.click(screen.getByText("Create Post"))

    expect(screen.getByText(/Title must/i)).toBeInTheDocument()
    expect(screen.getByText(/Description must/i)).toBeInTheDocument()
    expect(screen.getByText(/Please select a location/i)).toBeInTheDocument()
  })

  it("allows switching post type", async () => {
    const user = userEvent.setup()
    render(<CreatePostForm />)

    await user.click(screen.getByText("Discussion"))

    expect(screen.getByText("Discussion")).toBeInTheDocument()
  })

  it("shows search results and allows selecting a location", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              display_name: "Wandsworth, London",
              lat: "51.45",
              lon: "-0.18",
            },
          ]),
      } as any)
    )

    const user = userEvent.setup()
    render(<CreatePostForm />)

    const locationInput = screen.getByPlaceholderText(/Search area/i)
    await user.type(locationInput, "Wandsworth")

    const option = await screen.findByText("Wandsworth, London")
    await user.click(option)

    expect(locationInput).toHaveValue("Wandsworth, London")
  })

  it("submits form when all fields are valid", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              display_name: "Wandsworth, London",
              lat: "51.45",
              lon: "-0.18",
            },
          ]),
      } as any)
    )

    const user = userEvent.setup()
    render(<CreatePostForm />)

    await user.type(screen.getByPlaceholderText(/Post Title/i), "Valid Title")
    await user.type(
      screen.getByPlaceholderText(/Write details/i),
      "Valid description"
    )

    const locationInput = screen.getByPlaceholderText(/Search area/i)
    await user.type(locationInput, "Wandsworth")
    await user.click(await screen.findByText("Wandsworth, London"))

    await user.click(screen.getByText("Create Post"))

    expect(mutateMock).toHaveBeenCalled()
  })

  it("clears location when clear button is clicked", async () => {
    const user = userEvent.setup()
    render(<CreatePostForm />)

    const input = screen.getByPlaceholderText(/Search area/i)
    await user.type(input, "London")
    await user.click(screen.getByText("X"))

    expect(input).toHaveValue("")
  })

  it("handles current location button click (geolocation success)", async () => {
    const mockGeo = {
      getCurrentPosition: vi.fn((success) =>
        success({
          coords: { latitude: 51.5, longitude: -0.1 },
        })
      ),
    }

    Object.defineProperty(globalThis.navigator, "geolocation", {
      value: mockGeo,
      configurable: true,
    })

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            address: { city: "London", suburb: "Camden" },
          }),
      } as any)
    )

    const user = userEvent.setup()
    render(<CreatePostForm />)

    await user.click(screen.getByTitle("Use Current Location"))

    expect(
      await screen.findByDisplayValue(/Camden, London/i)
    ).toBeInTheDocument()
  })
})

