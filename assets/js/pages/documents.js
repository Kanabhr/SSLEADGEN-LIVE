/* Page script for documents */
let docDataTable = null;

        function copyShareLink(url) {
            navigator.clipboard?.writeText(url);
            alert('Share link copied to clipboard: ' + url);
        }

        function handleFileUpload(files) {
            if (!files || !files.length) return;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
                const shareUrl = 'https://ssadvisory.co.nz/share/doc-' + Math.floor(Math.random() * 8999 + 1000);

                if (docDataTable) {
                    docDataTable.row.add([
                        `<span class="fw-bold text-dark fs-13"><i class="feather-file-text text-danger me-2"></i> ${file.name}</span>`,
                        `<span class="fs-13 text-muted">General Client</span>`,
                        `<span class="fs-13 text-muted">${sizeMb}</span>`,
                        `<span class="fs-13 text-muted">Just Now</span>`,
                        `<button class="btn btn-sm btn-light text-primary fw-semibold py-1 px-2" onclick="copyShareLink('${shareUrl}')"><i class="feather-link me-1"></i> Copy Link</button>`,
                        `<div class="text-center">
                            <div class="dropdown">
                                <button class="btn btn-sm btn-light p-1" data-bs-toggle="dropdown" aria-expanded="false"><i class="feather-more-vertical"></i></button>
                                <ul class="dropdown-menu dropdown-menu-end fs-13">
                                    <li><a class="dropdown-menu-item text-dark text-decoration-none px-3 py-1 d-block" href="javascript:void(0);" onclick="alert('Downloading Document...')"><i class="feather-download me-2"></i> Download</a></li>
                                    <li><a class="dropdown-menu-item text-danger text-decoration-none px-3 py-1 d-block" href="javascript:void(0);" onclick="$(this).closest('tr').remove()"><i class="feather-trash-2 me-2"></i> Delete</a></li>
                                </ul>
                            </div>
                        </div>`
                    ]).draw(false);
                }
            }
        }

        $(document).ready(function () {
            docDataTable = $('#documentsTable').DataTable({
                responsive: true,
                pageLength: 10,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search documents..."
                }
            });

            const dropZone = document.getElementById('dropZoneContainer');
            if (dropZone) {
                dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.background = 'rgba(0, 168, 181, 0.1)'; });
                dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.background = 'rgba(0, 168, 181, 0.03)'; });
                dropZone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dropZone.style.background = 'rgba(0, 168, 181, 0.03)';
                    if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
                });
            }
        });

        document.getElementById('mobile-collapse')?.addEventListener('click', function () {
            document.getElementById('mainSidebar')?.classList.toggle('mob-navigation-active');
        });
