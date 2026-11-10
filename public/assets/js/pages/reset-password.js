/* Page script for reset-password */
function togglePass(inputId, icon) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('feather-eye');
                icon.classList.add('feather-eye-off');
            } else {
                input.type = 'password';
                icon.classList.remove('feather-eye-off');
                icon.classList.add('feather-eye');
            }
        }

        function handleReset(event) {
            event.preventDefault();
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;
            const mismatchAlert = document.getElementById('passMismatch');
            const btn = document.getElementById('submitBtn');
            const successAlert = document.getElementById('resetSuccess');

            if (newPass !== confirmPass) {
                mismatchAlert.classList.remove('d-none');
                return;
            } else {
                mismatchAlert.classList.add('d-none');
            }

            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Updating...';

            setTimeout(() => {
                document.getElementById('resetForm').classList.add('d-none');
                successAlert.classList.remove('d-none');

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1200);
            }, 800);
        }

        window.addEventListener('load', function () {
            var loader = document.getElementById('preloader');
            if (loader) {
                loader.classList.add('loaded');
                setTimeout(function () { loader.style.display = 'none'; }, 400);
            }
        });
