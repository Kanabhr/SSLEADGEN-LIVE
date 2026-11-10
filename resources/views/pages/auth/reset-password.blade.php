<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Set New Password | SS Advisory — SS Advisory</title>
    <!-- Google Fonts: Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/vendors/css/vendors.min.css" />
    <link rel="stylesheet" href="assets/css/theme.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link rel="stylesheet" href="assets/css/ss-custom.css?v=2.1" />
    

<body>
    <!--! [Start] SS Advisory Preloader !-->
    <div class="nxl-preloader" id="preloader">
        <div class="preloader-content text-center">
            <div class="preloader-logo mb-3">
                <img src="assets/images/logo.png" alt="SS Advisory Logo" class="img-fluid preloader-img" />
            </div>
            <div class="spinner-border text-primary" role="status"
                style="width: 2.2rem; height: 2.2rem; color: #00A8B5 !important;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <!--! [End] Preloader !-->
    <div class="auth-card">
        <div class="auth-header">
            <a href="login.html" class="d-inline-block mb-3">
                <img src="assets/images/logo.png" alt="SS Advisory Logo" class="auth-brand-logo" />
            </a>
            <h4 class="text-white fw-bold mb-1">Create New Password</h4>
            <p class="text-white-50 fs-12 mb-0">Your new password must be different from previous passwords</p>
        </div>
        <div class="auth-body">
            <div id="resetSuccess" class="alert alert-success d-none fs-12 mb-4" role="alert">
                <i class="feather-check-circle me-1 fs-14"></i>
                Password updated successfully! Redirecting to login...
            </div>

            <form id="resetForm" onsubmit="handleReset(event)">
                <div class="mb-3">
                    <label for="newPassword" class="form-label fs-12 fw-semibold text-dark">New Password</label>
                    <div class="input-group position-relative">
                        <span class="input-group-text bg-light text-muted"><i class="feather-lock"></i></span>
                        <input type="password" class="form-control pe-5" id="newPassword"
                            placeholder="Enter new password" minlength="8" required>
                        <i class="feather-eye password-toggle-icon" onclick="togglePass('newPassword', this)"></i>
                    </div>
                </div>

                <div class="mb-4">
                    <label for="confirmPassword" class="form-label fs-12 fw-semibold text-dark">Confirm New
                        Password</label>
                    <div class="input-group position-relative">
                        <span class="input-group-text bg-light text-muted"><i class="feather-shield"></i></span>
                        <input type="password" class="form-control pe-5" id="confirmPassword"
                            placeholder="Confirm new password" minlength="8" required>
                        <i class="feather-eye password-toggle-icon" onclick="togglePass('confirmPassword', this)"></i>
                    </div>
                    <div id="passMismatch" class="form-text fs-11 text-danger d-none mt-1">Passwords do not match.</div>
                </div>

                <button type="submit" id="submitBtn"
                    class="btn btn-primary-brand w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
                    <span>Update Password</span>
                    <i class="feather-check fs-14"></i>
                </button>

                <div class="text-center mt-3">
                    <a href="login.html"
                        class="fs-12 fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                        style="color: var(--accent-teal) !important;">
                        <i class="feather-arrow-left"></i> Back to Sign In
                    </a>
                </div>
            </form>
        </div>
        <div class="p-3 text-center bg-light border-top">
            <span class="fs-11 text-muted">&copy; 2026 SS Advisory | Developed By Sitesoch</span>
        </div>
    </div>

    <script src="assets/vendors/js/vendors.min.js"></script>
    
    <script src="assets/js/script.js?v=1.3"></script>
    <script src="assets/js/pages/reset-password.js"></script>
</body>

</html>