import "./App.css"
import Navbar from "./features/navbar/components/Navbar"
import SmallScreenMsg from "./components/SmallScreenMsg"

function App() {
  return (
    <>
      <div className="md:hidden flex items-center justify-center absolute inset-0 mx-12">
        <SmallScreenMsg className="" />
      </div>

      <div className="hidden md:flex flex-col gap-6">
        <Navbar />
      </div>
    </>
  )
}

export default App
