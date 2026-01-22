type SecondaryCardWrapperProps = {
  children: React.ReactNode,
  className?: string
}

const SecondaryCardWrapper = ({ children, className }: SecondaryCardWrapperProps) => {
  return (
    <div className={`bg-secondary text-secondary-foreground p-1.5 rounded ${className}`}>
      <div className="bg-card text-card-foreground p-3 rounded">{children}</div>
    </div>
  )
}

export default SecondaryCardWrapper
