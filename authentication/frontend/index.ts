export default {
  port: 3005,
  fetch(request) {
    const url = new URL(request.url)
    
    if (url.pathname === "/") {
      return Response.redirect("./login.html")
    }
    
    const file = Bun.file("." + url.pathname)
    return new Response(file)
  },
}

console.log("Bun server running on http://localhost:3005")