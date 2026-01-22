type CardWrapperProps = {
  children: React.ReactNode,
  className?: string
}

const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <div className={`bg-card text-card-foreground p-1.5 rounded ${className}`}>
      <div className="bg-card text-card-foreground p-3 rounded">{children}</div>
    </div>
  )
}

export default CardWrapper
