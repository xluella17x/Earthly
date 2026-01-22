import PostcodeImpactSentence from "./PostcodeImpactSentence"
import PostcodeImpactStats from "./PostcodeImpactStats"

type SidebarProps = {
  className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <PostcodeImpactStats />
      <PostcodeImpactSentence />
    </div>
  )
}

export default Sidebar
