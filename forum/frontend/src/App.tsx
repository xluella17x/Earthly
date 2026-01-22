import "./App.css"
import Navbar from "./features/navbar/components/Navbar"
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
      </div>
    </MaxWidthWrapper>
  )
}

export default App
