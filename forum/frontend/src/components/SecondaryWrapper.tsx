type SecondaryWrapperProps = {
  children: React.ReactNode,
  className?: string
}

const SecondaryWrapper = ({ children, className }: SecondaryWrapperProps) => {
  return (
    <div className={`bg-secondary text-secondary-foreground p-1.5 rounded ${className}`}>
      <div className="bg-secondary text-secondary-foreground p-3 rounded">{children}</div>
    </div>
  )
}

export default SecondaryWrapper
