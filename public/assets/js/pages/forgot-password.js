/* Page script for forgot-password */
function handleSendResetLink(e) {
            e.preventDefault();
            const email = document.getElementById('resetEmailInput').value;
            document.getElementById('sentEmailDisplay').innerText = email;
            document.getElementById('resetSuccessAlert').classList.remove('d-none');
            const btn = document.getElementById('btnSendReset');
            btn.innerHTML = '<span>Resend Reset Instructions</span> <i class="feather-rotate-cw fs-14 me-1"></i>';
        }
