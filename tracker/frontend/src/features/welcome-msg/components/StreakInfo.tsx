const user = {
  streak: 5,
}

const StreakInfo = () => {
  return (
    <div className="bg-secondary text-secondary-foreground flex items-center gap-1.5 rounded p-3">
      <div className="w-50">
        <h2 className="text-3xl">Your Green Streak</h2>
      </div>

      <div className="bg-card rounded flex items-center gap-1.5 p-1.5 pr-3">
        <img src="logo.png" alt="logo" className="size-16" />
        <span className="text-5xl">{user.streak} days</span>
      </div>
    </div>
  )
}

export default StreakInfo
