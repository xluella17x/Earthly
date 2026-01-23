const SUPABASE_URL = "https://ykapfmgxxleezeyefrki.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Elc6C0vgfeYBb0jm1Ozg9Q_HSYrl34F";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email_address = loginForm.querySelector('[name="email_address"]').value;
    const password = loginForm.querySelector('[name="password"]').value;

    const { data: user, error } = await supabaseClient
      .from("user_table")
      .select("*")
      .eq("email_address", email_address)
      .single();

    if (error || !user) {
      alert("User not found");
      return;
    }

    if (user.password !== password) {
      alert("Invalid password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        first_name: user.first_name,
        email_address: user.email_address,
        community: user.community
      })
    );

    window.location.href = "dashboard.html";
  });
}

