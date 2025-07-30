// ========== STORAGE & UTILITY FUNCTIONS ==========
function saveUserData(email, password, loginMethod = 'email') {
  let users = JSON.parse(localStorage.getItem('techflow_users') || '[]');
  const userData = {
    email, password, loginMethod,
    registeredAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };
  const idx = users.findIndex(u => u.email === email);
  if (idx !== -1) users[idx] = {...users[idx], ...userData};
  else users.push(userData);
  localStorage.setItem('techflow_users', JSON.stringify(users));
  prepareExcelData(users);
  return userData;
}
function prepareExcelData(users) {
  const csvHeader = 'Email,Password,Login Method,Registered At,Last Login\n';
  const csvData = users.map(user =>
    `${user.email},${user.password},${user.loginMethod},${user.registeredAt},${user.lastLogin}`
  ).join('\n');
  localStorage.setItem('techflow_csv_data', csvHeader + csvData);
}
function downloadExcelData() {
  const csvData = localStorage.getItem('techflow_csv_data'); if (!csvData) return;
  const blob = new Blob([csvData], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'techflow_users.csv'; a.click();
  window.URL.revokeObjectURL(url);
}

// ========== ELEMENTS ==========
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const togglePassword = document.getElementById('togglePassword');
const forgotLink = document.getElementById('forgotPasswordLink');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const githubLoginBtn = document.getElementById('githubLoginBtn');
const successDiv = document.getElementById('successMessage');

// ========== VALIDATION ==========
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return re.test(email);
}
function showError(id, msg) {
  const input = document.getElementById(id);
  const errorDiv = document.getElementById(id + 'Error');
  input.classList.add('error'); input.classList.remove('success');
  errorDiv.textContent = msg; errorDiv.classList.add('show');
}
function showSuccess(id) {
  const input = document.getElementById(id);
  const errorDiv = document.getElementById(id + 'Error');
  input.classList.remove('error'); input.classList.add('success');
  errorDiv.classList.remove('show');
}
function clearValidation(id) {
  const input = document.getElementById(id);
  const errorDiv = document.getElementById(id + 'Error');
  input && input.classList.remove('error','success');
  errorDiv && errorDiv.classList.remove('show');
}
function showSuccessMessage(message) {
  successDiv.textContent = message;
  successDiv.classList.add('show');
  setTimeout(()=> successDiv.classList.remove('show'), 3500);
}

// ========== REAL-TIME VALIDATION ==========
emailInput.addEventListener('input', function() {
  const email = this.value.trim();
  if (!email) clearValidation('email');
  else if (!validateEmail(email)) showError('email', 'Please enter a valid email address');
  else showSuccess('email');
});
passwordInput.addEventListener('input', function() {
  if (!this.value) clearValidation('password');
  else if (this.value.length < 6) showError('password', 'Password must be at least 6 characters');
  else showSuccess('password');
});

// ========== SHOW/HIDE PASSWORD ==========
togglePassword.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
});

// ========== EMAIL/PASSWORD LOGIN ==========
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let isValid = true;
  if (!email) { showError('email','Email is required'); isValid=false; }
  else if (!validateEmail(email)) { showError('email', 'Please enter a valid email address'); isValid=false; }
  else showSuccess('email');
  if (!password) { showError('password','Password is required'); isValid=false; }
  else if (password.length < 6) { showError('password','Password must be at least 6 characters'); isValid=false; }
  else showSuccess('password');
  if (!isValid) return;
  loginBtn.classList.add('loading'); loginBtn.disabled = true;
  setTimeout(() => {
    loginBtn.classList.remove('loading'); loginBtn.disabled = false;
    saveUserData(email, password, 'email');
    showSuccessMessage(`Successfully signed in: ${email}`);
    setTimeout(() => window.location.href = '/dashboard', 1200);
  }, 1000);
});

// ========== SOCIAL LOGIN: GOOGLE ==========
const googleModal = document.getElementById('googleModal');
const googleLoginForm = document.getElementById('googleLoginForm');
const googleEmailInput = document.getElementById('googleEmail');
const cancelGoogleBtns = [document.getElementById('cancelGoogle'), document.getElementById('cancelGoogle2')];

googleLoginBtn.addEventListener('click', () => {
  googleModal.classList.add('active');
  setTimeout(()=> googleEmailInput.focus(),100);
});
function hideGoogleModal() {
  googleModal.classList.remove('active');
  googleEmailInput.value = "";
  clearValidation('googleEmail');
}
cancelGoogleBtns.forEach(btn => btn.addEventListener('click', hideGoogleModal));
googleModal.addEventListener('click', (e)=> { if (e.target===googleModal) hideGoogleModal(); });

googleEmailInput.addEventListener('input', function() {
  const email = this.value.trim();
  if (!email) clearValidation('googleEmail');
  else if (!validateEmail(email)) showError('googleEmail', 'Please enter a valid email address');
  else if (!email.endsWith('@gmail.com') && !email.endsWith('@googlemail.com'))
    showError('googleEmail', 'Please use a Gmail address');
  else showSuccess('googleEmail');
});
googleLoginForm.addEventListener('submit', function(e){
  e.preventDefault();
  const email = googleEmailInput.value.trim();
  if (!validateEmail(email) || (!email.endsWith('@gmail.com') && !email.endsWith('@googlemail.com'))) {
    showError('googleEmail', 'Please enter a valid Gmail address'); return;
  }
  saveUserData(email, 'google_auth', 'google');
  hideGoogleModal();
  showSuccessMessage(`Successfully signed in with Google: ${email}`);
  setTimeout(() => window.location.href = '/dashboard', 1100);
});

// ========== SOCIAL LOGIN: GITHUB ==========
githubLoginBtn.addEventListener('click', function() {
  const username = prompt('Enter your GitHub username:');
  if (!username) return;
  const email = `${username}@github.local`;
  saveUserData(email, 'github_auth', 'github');
  showSuccessMessage(`Successfully signed in with GitHub: ${username}`);
  setTimeout(() => window.location.href = '/dashboard', 1100);
});

// ========== FORGOT PASSWORD MODAL ==========
const forgotModal = document.getElementById('forgotModal');
const closeForgotBtns = [document.getElementById('closeForgot'), document.getElementById('closeForgot2')];
const forgotForm = document.getElementById('forgotForm');
const forgotEmail = document.getElementById('forgotEmail');
forgotLink.addEventListener('click', function(evt){
  evt.preventDefault(); forgotModal.classList.add('active');
  setTimeout(()=> forgotEmail.focus(),100);
});
function hideForgotModal() {
  forgotModal.classList.remove('active');
  forgotEmail.value = "";
  clearValidation('forgotEmail');
}
closeForgotBtns.forEach(btn => btn.addEventListener('click', hideForgotModal));
forgotModal.addEventListener('click', (e)=> { if (e.target===forgotModal) hideForgotModal(); });
forgotEmail.addEventListener('input', function() {
  const email = this.value.trim();
  if (!email) clearValidation('forgotEmail');
  else if (!validateEmail(email)) showError('forgotEmail', 'Please enter a valid email address');
  else showSuccess('forgotEmail');
});
forgotForm.addEventListener('submit', function(e){
  e.preventDefault();
  const email = forgotEmail.value.trim();
  if (!validateEmail(email)) {
    showError('forgotEmail', 'Please enter a valid email address'); return;
  }
  hideForgotModal();
  showSuccessMessage('A password reset link has been sent (simulated)');
});

// ========== ESCAPE KEY HANDLING FOR MODALS ==========
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (googleModal.classList.contains('active')) hideGoogleModal();
    if (forgotModal.classList.contains('active')) hideForgotModal();
  }
});

// ========= Console/dev info: Export users as CSV =========
window.downloadExcelData = downloadExcelData;
