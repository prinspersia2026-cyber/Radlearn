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


const btnNewCase = document.getElementById("btnNewCase");

const newCaseCard = document.getElementById("newCaseCard");

const btnBackDashboard =
  document.getElementById("btnBackDashboard");

const btnSubmitCase =
  document.getElementById("btnSubmitCase");

const caseMsg =
  document.getElementById("caseMsg");

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


btnNewCase.addEventListener(
  "click",
  showNewCase
);

btnBackDashboard.addEventListener(
  "click",
  showDashboard
);

btnSubmitCase.addEventListener(
  "click",
  submitCase
);


async function logout() {

  await supabaseClient.auth.signOut();

  dashboard.style.display = "none";
  newCaseCard.style.display = "none";
  loginCard.style.display = "block";

  passwordInput.value = "";
}

function showNewCase(){

  dashboard.style.display = "none";

  newCaseCard.style.display = "block";
}

function showDashboard(){

  newCaseCard.style.display = "none";

  dashboard.style.display = "block";
}


async function submitCase(){

  caseMsg.textContent = "";

  const title =
    document.getElementById("caseTitle").value;

  if(!title){

    caseMsg.textContent =
      "Titel mangler";

    return;
  }

  const modality =
    document.getElementById("caseModality").value;

  const organ =
    document.getElementById("caseOrgan").value;

  const clinical_context =
    document.getElementById("clinicalContext").value;

  const error_description =
    document.getElementById("errorDescription").value;

  const correct_interpretation =
    document.getElementById("correctInterpretation").value;

  const prevention =
    document.getElementById("prevention").value;

  const learning_points =
    document.getElementById("learningPoints").value;

  const anonymous =
    document.getElementById("anonymous").checked;

  const contact_allowed =
    document.getElementById("contactAllowed").checked;

  const {
    data,
    error
  } = await supabaseClient
    .from("cases")
    .insert([
      {
        title,
        modality,
        organ,
        clinical_context,
        error_description,
        correct_interpretation,
        prevention,
        learning_points,
        anonymous,
        contact_allowed,
        status:"afventer"
      }
    ]);

  if(error){

    console.error(error);

    caseMsg.textContent =
      error.message;

    return;
  }

  caseMsg.textContent =
    "Case gemt";

}
