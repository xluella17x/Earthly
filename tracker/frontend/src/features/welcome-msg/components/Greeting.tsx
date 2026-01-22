const user = {
  name: "John Doe",
}

const Greeting = () => {
  return (
    <div>
      <h1 className="text-6xl">
        Hi, <span>{user.name}</span>
      </h1>
    </div>
  )
}

export default Greeting
