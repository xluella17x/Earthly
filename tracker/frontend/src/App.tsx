import "./App.css"
import Navbar from "./features/navbar/components/Navbar"
import WelcomeMsg from "./features/welcome-msg/components/WelcomeMsg"

function App() {
  return (
    <div className="flex flex-col gap-3">
      <Navbar />
      <WelcomeMsg />
    </div>
  )
}

export default App
