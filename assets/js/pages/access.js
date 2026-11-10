/* Page script for access */
let usersTable = null;
        let rolesTable = null;

        function handleAddNewUser() {
            const name = $('#userNameInput').val().trim();
            const email = $('#userEmailInput').val().trim();
            const role = $('#userRoleSelect').val();
            const fspr = $('#userFsprInput').val().trim() || 'FSP-780192';

            if (!name || !email) return;

            if (usersTable) {
                usersTable.row.add([
                    `<span class="fw-bold text-dark fs-13">${name}</span>`,
                    `<span class="fs-13 text-muted">${email}</span>`,
                    `<span class="badge bg-soft-primary text-primary fs-11 fw-bold">${role}</span>`,
                    `<span class="fs-13 fw-semibold">${fspr}</span>`,
                    `<span class="status-pill-inforce">Active</span>`,
                    `<span class="fs-13 text-muted">Just Now</span>`,
                    `<div class="text-center">
                        <div class="action-kebab-wrapper">
                            <button class="action-kebab-btn"><i class="feather-more-vertical"></i></button>
                            <div class="action-kebab-dropdown">
                                <a href="javascript:void(0);" class="action-kebab-item"><i class="feather-edit text-primary me-1"></i> Edit User</a>
                                <a href="javascript:void(0);" class="action-kebab-item text-danger"><i class="feather-user-x text-danger me-1"></i> Deactivate</a>
                            </div>
                        </div>
                    </div>`
                ]).draw(false);
            }

            $('#addUserForm')[0].reset();
            const modalEl = document.getElementById('addUserModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }

        function handleAddNewRole() {
            const title = $('#roleTitleInput').val().trim();
            const desc = $('#roleDescInput').val().trim() || 'Custom advisory access role';

            if (!title) return;

            if (rolesTable) {
                rolesTable.row.add([
                    `<span class="fw-bold text-dark fs-13">${title}</span>`,
                    `<span class="fs-13 text-muted">${desc}</span>`,
                    `<span class="badge bg-success fs-11">Read / Write</span>`,
                    `<span class="badge bg-success fs-11">Read / Write</span>`,
                    `<span class="badge bg-success fs-11">Read / Write</span>`,
                    `<span class="badge bg-info fs-11">Read Only</span>`,
                    `<span class="badge bg-success fs-11">Read / Write</span>`,
                    `<div class="text-center">
                        <div class="action-kebab-wrapper">
                            <button class="action-kebab-btn"><i class="feather-more-vertical"></i></button>
                            <div class="action-kebab-dropdown">
                                <a href="javascript:void(0);" class="action-kebab-item"><i class="feather-settings text-primary me-1"></i> Configure</a>
                            </div>
                        </div>
                    </div>`
                ]).draw(false);
            }

            $('#addRoleForm')[0].reset();
            const modalEl = document.getElementById('addRoleModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }

        $(document).ready(function () {
            if (!$.fn.DataTable.isDataTable('#usersTable')) {
                usersTable = $('#usersTable').DataTable({
                    retrieve: true,
                    responsive: true,
                    pageLength: 10,
                    language: { search: "_INPUT_", searchPlaceholder: "Search users..." }
                });
            }

            if (!$.fn.DataTable.isDataTable('#rolesTable')) {
                rolesTable = $('#rolesTable').DataTable({
                    retrieve: true,
                    responsive: true,
                    pageLength: 10,
                    language: { search: "_INPUT_", searchPlaceholder: "Search roles..." }
                });
            }
        });
