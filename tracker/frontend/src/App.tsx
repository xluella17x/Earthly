import "./App.css"
import Navbar from "./features/navbar/components/Navbar"
import WelcomeMsg from "./features/welcome-msg/components/WelcomeMsg"
import TrackingDashboard from "./features/tracker/components/TrackingDashboard"
import Sidebar from "./features/sidebar/components/Sidebar"

function App() {
  return (
    <div className="hidden md:flex flex-col gap-6">
      <Navbar />
      <WelcomeMsg />
      <div className="flex gap-3">
        <TrackingDashboard className="basis-2/3"/>
        <Sidebar className="basis-1/3" />
      </div>
    </div>
  )
}

export default App
