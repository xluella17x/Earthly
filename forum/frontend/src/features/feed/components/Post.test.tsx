import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import Post from "./Post"

/* ------------------ Mocks ------------------ */

vi.mock("@/components/SecondaryCardWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="secondary-card">{children}</div>
  ),
}))

const mutateLikeMock = vi.fn()
const mutateAttendMock = vi.fn()

vi.mock("@tanstack/react-query", () => ({
  useMutation: ({ mutationFn }: any) => {
    if (mutationFn.toString().includes("/like")) {
      return { mutate: mutateLikeMock, isPending: false }
    }
    return { mutate: mutateAttendMock, isPending: false }
  },
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
  }),
}))

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    className,
  }: any) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  ),
}))

vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

vi.mock("@/lib/constants", () => ({
  POST_TYPE_COLORS: {
    event: "bg-blue-500",
    discussion: "bg-green-500",
    announcement: "bg-yellow-500",
  },
}))

vi.mock("@/lib/api", () => ({
  fetcher: vi.fn(() => Promise.resolve({})),
}))

vi.mock("lucide-react", () => ({
  MapPin: () => <span>MapPin</span>,
  Heart: () => <span>Heart</span>,
  Users: () => <span>Users</span>,
  Clock: () => <span>Clock</span>,
}))

/* ------------------ Tests ------------------ */

describe("Post", () => {
  const baseProps = {
    id: "1",
    title: "Community Cleanup",
    description: "Let’s clean the park together",
    type: "event" as const,
    locationName: "Central Park",
    createdAt: new Date().toISOString(),
    likeCount: 5,
    attendeeCount: 12,
    isLikedByMe: false,
    isAttending: false,
  }

  beforeEach(() => {
    mutateLikeMock.mockClear()
    mutateAttendMock.mockClear()
  })

  it("renders post content correctly", () => {
    render(<Post {...baseProps} />)

    expect(screen.getByText("Community Cleanup")).toBeInTheDocument()
    expect(screen.getByText("Let’s clean the park together")).toBeInTheDocument()
    expect(screen.getByText("event")).toBeInTheDocument()
    expect(screen.getByText("Central Park")).toBeInTheDocument()
  })

  it("renders relative time text", () => {
    render(<Post {...baseProps} />)

    expect(
      screen.getByText(/Just now|minute|hour|day/i)
    ).toBeInTheDocument()
  })



  it("shows 'Just now' when createdAt is undefined", () => {
    render(
      <Post
        {...baseProps}
        createdAt={undefined}
      />
    )

    expect(screen.getByText("Just now")).toBeInTheDocument()
  })

  it("shows 'Just now' for very recent posts", () => {
    const now = new Date().toISOString()

    render(
      <Post
        {...baseProps}
        createdAt={now}
      />
    )

    expect(screen.getByText("Just now")).toBeInTheDocument()
  })

  it("shows minutes ago for posts created minutes ago", () => {
    const minutesAgo = new Date(
      Date.now() - 5 * 60 * 1000
    ).toISOString()

    render(
      <Post
        {...baseProps}
        createdAt={minutesAgo}
      />
    )

    expect(screen.getByText(/minute/i)).toBeInTheDocument()
  })

  it("shows hours ago for posts created hours ago", () => {
    const hoursAgo = new Date(
      Date.now() - 2 * 60 * 60 * 1000
    ).toISOString()

    render(
      <Post
        {...baseProps}
        createdAt={hoursAgo}
      />
    )

    expect(screen.getByText(/hour/i)).toBeInTheDocument()
  })

  it("shows formatted date for posts older than a week", () => {
    const oldDate = new Date(
      Date.now() - 10 * 24 * 60 * 60 * 1000
    ).toISOString()

    render(
      <Post
        {...baseProps}
        createdAt={oldDate}
      />
    )

    expect(
      screen.getByText(/\d{1,2}\s[A-Za-z]{3}/)
    ).toBeInTheDocument()
  })

 

  it("does not render location when locationName is missing", () => {
    render(
      <Post
        {...baseProps}
        locationName={null}
      />
    )

    expect(screen.queryByText("Central Park")).not.toBeInTheDocument()
  })

  it("renders like and attend buttons for event posts", () => {
    render(<Post {...baseProps} />)

    expect(screen.getByText("Like (5)")).toBeInTheDocument()
    expect(screen.getByText("Attend (12)")).toBeInTheDocument()
  })

  it("calls like mutation when Like button is clicked", async () => {
    const user = userEvent.setup()

    render(<Post {...baseProps} />)

    await user.click(screen.getByText("Like (5)"))

    expect(mutateLikeMock).toHaveBeenCalled()
  })

  it("renders liked state correctly", () => {
    render(
      <Post
        {...baseProps}
        isLikedByMe={true}
      />
    )

    expect(screen.getByText("Like (5)")).toBeInTheDocument()
  })

  it("calls attend mutation when Attend button is clicked", async () => {
    const user = userEvent.setup()

    render(<Post {...baseProps} />)

    await user.click(screen.getByText("Attend (12)"))

    expect(mutateAttendMock).toHaveBeenCalled()
  })

  it("renders attending state correctly", () => {
    render(
      <Post
        {...baseProps}
        isAttending={true}
      />
    )

    expect(screen.getByText("I'm attending (12)")).toBeInTheDocument()
  })

  it("does not render Attend button for non-event posts", () => {
    render(
      <Post
        {...baseProps}
        type="discussion"
      />
    )

    expect(screen.getByText("Like (5)")).toBeInTheDocument()
    expect(screen.queryByText(/Attend/i)).not.toBeInTheDocument()
  })
})
