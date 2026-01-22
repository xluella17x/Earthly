import SecondaryCardWrapper from "@/components/SecondaryCardWrapper"

type TrackingDashboardProps = {
  className?: string
}

const TrackingDashboard = ({ className }: TrackingDashboardProps) => {
  return (
    <SecondaryCardWrapper className={className}>
      <h1 className="font-semibold">Track your Habits, See your Impact</h1>
      <div className="flex">
        <div></div>
      </div>
    </SecondaryCardWrapper>
  )
}

export default TrackingDashboard
