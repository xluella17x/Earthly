type MutedCardWrapperProps = {
  children: React.ReactNode,
  className?: string
}

const MutedCardWrapper = ({ children, className }: MutedCardWrapperProps) => {
  return (
    <div className={`bg-card/50 text-card-foreground p-1.5 rounded ${className}`}>
      <div className="bg-card/50 text-card-foreground p-3 rounded">{children}</div>
    </div>
  )
}

export default MutedCardWrapper
