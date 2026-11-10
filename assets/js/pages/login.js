/* Page script for login */
function togglePasswordVisibility() {
            const pwdInput = document.getElementById('passwordInput');
            const toggleBtn = document.getElementById('togglePasswordBtn');
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                toggleBtn.classList.remove('feather-eye');
                toggleBtn.classList.add('feather-eye-off');
            } else {
                pwdInput.type = 'password';
                toggleBtn.classList.remove('feather-eye-off');
                toggleBtn.classList.add('feather-eye');
            }
        }
