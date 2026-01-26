import "./App.css"
import Navbar from "./features/navbar/components/Navbar"
import WelcomeMsg from "./features/welcome-msg/components/WelcomeMsg"
import TrackingDashboard from "./features/tracker/components/TrackingDashboard"
import Sidebar from "./features/sidebar/components/Sidebar"
import SmallScreenMsg from "./components/SmallScreenMsg"
import MaxWidthWrapper from "./components/MaxWidthWrapper"

function App() {
  return (
    <MaxWidthWrapper className="py-8">
      <div className="md:hidden flex items-center justify-center absolute inset-0 mx-12">
        <SmallScreenMsg className="" />
      </div>

      <div className="hidden md:flex flex-col gap-6">
        <Navbar />
        <WelcomeMsg />
        <div className="flex gap-3">
          <TrackingDashboard className="basis-2/3" />
          <Sidebar className="basis-1/3" />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default App
