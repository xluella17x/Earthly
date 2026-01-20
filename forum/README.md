✗ ReactJS + Bun
- not mature enough to replace Vite at scale, lack of plugins

ReactJS + Vite + Bun
- vite is great for build tools
- bun for faster & better package management
- Bun outperforms Node by thirty percent
https://bun.com/docs/guides/ecosystem/vite

Node is runtime, Vite/webpack is build tool

.jsx
// No interface definition needed
export const Post = ({ id, username, content, likeCount, isLiked = false }) => {
  return (
    <div className="post-card">
      <h3>{username}</h3>
      <p>{content}</p>
      <button>
        {isLiked ? ":heart:" : ":white_heart:"} {likeCount}
      </button>
    </div>
  );
};

const ForumPage() {
    return (
        <Navbar />
        <Feed />
        <Sidebar />
    )
}

const Feed() {
    return (
        <Location />
        <Posts />
    )
}

const Navbar() {
        return (
            <nav>
                {navLinks.map(link) => {
                    <NavItem />
                }}
            </nav>
        )
    
}

const NavItem()  {
    return (
        <button>{name}</button>
    )
}

const navLinks = [
    {
        name: "Do Your Bit"
        url: "/do-your-bit"
    },
    {
        name: "Your Community"
        url: "/your-community"
    },
]