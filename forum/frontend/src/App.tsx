import "./App.css"
import Navbar from "./features/navbar/components/Navbar"
import SmallScreenMsg from "./components/SmallScreenMsg"
import MaxWidthWrapper from "./components/MaxWidthWrapper"
import Location from "./features/location/components/Location"
import Feed from "./features/feed/components/Feed"
import CreatePostForm from "./features/create-post/components/CreatePostForm"
import Filter from "./features/filter-posts/components/Filter"
import { useState } from "react"

function App() {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    undefined,
  )

  return (
    <MaxWidthWrapper className="py-8">
      <div className="md:hidden flex items-center justify-center absolute inset-0 mx-12">
        <SmallScreenMsg className="" />
      </div>
      <div className="hidden md:flex flex-col gap-6">
        <Navbar />
        <div className="flex gap-6">
          <div className="basis-2/3 flex flex-col gap-6">
            <Location />
            <Feed filter={activeFilter} />
          </div>
          <div className="basis-1/3 flex flex-col gap-6">
            <CreatePostForm />
            <Filter
              currentFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default App
