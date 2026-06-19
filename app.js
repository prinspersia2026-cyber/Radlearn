const SUPABASE_URL = "https://giqntjpqmmundrqropjv.supabase.co";

const SUPABASE_KEY =
"sb_publishable_nQIezBtt8hfyX2EFHu-l7g_iPgXeYd8";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const loginCard = document.getElementById("loginCard");
const dashboard = document.getElementById("dashboard");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginMsg = document.getElementById("loginMsg");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

btnLogin.addEventListener("click", login);
btnLogout.addEventListener("click", logout);

async function login() {

  loginMsg.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    loginMsg.textContent =
      "Udfyld email og password";
    return;
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    loginMsg.textContent =
      error.message;
    return;
  }

  loginCard.style.display = "none";
  dashboard.style.display = "block";

  console.log("Login OK", data);
}

async function logout() {

  await supabaseClient.auth.signOut();

  dashboard.style.display = "none";
  loginCard.style.display = "block";

  passwordInput.value = "";
}