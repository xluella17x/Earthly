type SecondaryMutedCardWrapperProps = {
  children: React.ReactNode,
  className?: string
}

const SecondaryMutedCardWrapper = ({ children, className }: SecondaryMutedCardWrapperProps) => {
  return (
    <div className={`bg-secondary text-secondary-foreground p-1.5 rounded ${className}`}>
      <div className="bg-card/50 text-card-foreground p-3 rounded">{children}</div>
    </div>
  )
}

export default SecondaryMutedCardWrapper
