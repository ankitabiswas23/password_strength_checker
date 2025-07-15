const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strength');
const adviceList = document.getElementById('advice-list');
const generateBtn = document.getElementById('generate-btn');
const toggle = document.getElementById('show-toggle');
const generatedOutput = document.getElementById('generated-output');
const copyBtn = document.getElementById('copy-btn');

function checkStrength(password) {
  let strength = 0;
  let advice = [];

  if (password.length >= 8) strength++;
  else advice.push("Use at least 8 characters.");

  if (/[a-z]/.test(password)) strength++;
  else advice.push("Add lowercase letters.");

  if (/[A-Z]/.test(password)) strength++;
  else advice.push("Add uppercase letters.");

  if (/\d/.test(password)) strength++;
  else advice.push("Include numbers.");

  if (/[!@#$%^&*(),.?\":{}|<>]/.test(password)) strength++;
  else advice.push("Include special characters (!@#...).");

  let label = "Weak";
  if (strength >= 5) label = "Strong";
  else if (strength >= 3) label = "Medium";

  return { label, advice };
}

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  updateStrength(password);
});

generateBtn.addEventListener('click', () => {
  const newPassword = generateStrongPassword(14);
  document.getElementById('generated-text').textContent = newPassword;
  generatedOutput.style.display = 'block';
  copyBtn.style.display = 'inline-block';
  strengthText.textContent = 'Strength: -';
  strengthText.className = '';
  adviceList.innerHTML = '';
});

function updateStrength(password) {
  const result = checkStrength(password);
  strengthText.textContent = `Strength: ${result.label}`;
  strengthText.className = result.label;
  adviceList.innerHTML = '';
  result.advice.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    adviceList.appendChild(li);
  });
}

function generateStrongPassword(length) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const all = lowercase + uppercase + numbers + symbols;

  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

toggle.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggle.textContent = isPassword ? '🔒 Hide Password' : '🔓 Show Password';
});

// Clipboard fallback (for ChatGPT sandbox); works in real browser
copyBtn.addEventListener('click', () => {
  const password = document.getElementById('generated-text').textContent;
  if (password.trim() !== '') {
    navigator.clipboard.writeText(password).then(() => {
      copyBtn.style.boxShadow = '0 0 0 2px green';
      setTimeout(() => {
        copyBtn.style.boxShadow = 'none';
      }, 1500);
    }).catch(() => {
      alert('Copy this password manually:\n' + password);
    });
  }
});
