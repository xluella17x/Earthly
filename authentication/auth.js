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
    window.location.href = "welcome.html";
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      first_name: signupForm.querySelector('[name="first_name"]').value,
      last_name: signupForm.querySelector('[name="last_name"]').value,
      email_address: signupForm.querySelector('[name="email_address"]').value,
      password: signupForm.querySelector('[name="password"]').value,
      postcode: signupForm.querySelector('[name="postcode"]').value,
      community: signupForm.querySelector('[name="community"]').value
    };

    const { data: existingUser, error: selectError } =
      await supabaseClient
        .from("user_table")
        .select("id")
        .eq("email_address", formData.email_address)
        .maybeSingle();

    if (existingUser) {
      alert("A user with this email already exists");
      return;
    }

    const { data, error } = await supabaseClient
      .from("user_table")
      .insert([formData])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      alert("Signup failed");
      return;
    }

    alert("Account created successfully! Please log in.");
    window.location.href = "login.html";
  });
}
