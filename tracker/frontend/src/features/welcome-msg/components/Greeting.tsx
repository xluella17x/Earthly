const user = {
  name: "John Doe",
}

const Greeting = () => {
  return (
    <div>
      <h1 className="text-6xl">
        <span>Hi, </span>
        <span>{user.name}</span>
      </h1>
    </div>
  )
}

export default Greeting
