/* Page script for calendar */
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let currentMonthIdx = 7;
        let currentYear = 2026;

        const defaultEvents = {
            18: [
                { title: '09:00 Team Strategy Sync', time: '09:00 AM - 10:00 AM', client: 'Internal Team', loc: 'Boardroom', status: 'Confirmed', notes: 'Weekly sales pipeline sync.', colorClass: 'event-blue' },
                { title: '10:30 Life Review (Kishore)', time: '10:30 AM - 11:30 AM', client: 'Kishore Kumar', loc: 'Zoom Video Call', status: 'Confirmed', notes: 'Reviewing life cover sum assured.', colorClass: 'event-green' },
                { title: '14:00 Trauma Signing (Rahul)', time: '02:00 PM - 03:00 PM', client: 'Rahul Sharma', loc: 'Office Auckland', status: 'Confirmed', notes: 'Final document signing.', colorClass: 'event-yellow' }
            ],
            19: [
                { title: '11:00 Policy Renewal', time: '11:00 AM - 12:00 PM', client: 'Vandana Singh', loc: 'Phone Call', status: 'Scheduled', notes: 'Send renewal documents.', colorClass: 'event-purple' }
            ],
            20: [
                { title: '15:00 Health Consult', time: '03:00 PM - 04:00 PM', client: 'Ravi Mehta', loc: 'Zoom Call', status: 'Confirmed', notes: 'Family health plan quote.', colorClass: 'event-blue' }
            ],
            21: [
                { title: '10:00 Claims Sync', time: '10:00 AM - 11:00 AM', client: 'Neha Gupta', loc: 'Teams Call', status: 'Confirmed', notes: 'Review underwriter notes.', colorClass: 'event-green' }
            ]
        };

        function renderMonthGrid() {
            document.getElementById('calendarMonthTitle').innerText = months[currentMonthIdx] + ' ' + currentYear;

            const firstDay = new Date(currentYear, currentMonthIdx, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
            const daysInPrevMonth = new Date(currentYear, currentMonthIdx, 0).getDate();

            let gridHtml = '<table class="table table-bordered align-middle mb-0 calendar-table w-100">';
            gridHtml += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>';

            let dayCounter = 1;
            let nextMonthDay = 1;

            for (let r = 0; r < 5; r++) {
                gridHtml += '<tr>';
                for (let c = 0; c < 7; c++) {
                    const cellIdx = r * 7 + c;
                    if (cellIdx < firstDay) {
                        const prevDate = daysInPrevMonth - (firstDay - 1 - cellIdx);
                        gridHtml += `<td class="calendar-cell other-month fw-bold">${prevDate}</td>`;
                    } else if (dayCounter <= daysInMonth) {
                        const isToday = (currentMonthIdx === 7 && currentYear === 2026 && dayCounter === 18);
                        const todayClass = isToday ? 'today' : '';

                        let eventsHtml = '';
                        if (currentMonthIdx === 7 && currentYear === 2026 && defaultEvents[dayCounter]) {
                            defaultEvents[dayCounter].forEach(ev => {
                                eventsHtml += `<div class="event-badge ${ev.colorClass}" onclick="event.stopPropagation(); openCalendarEventDetail('${ev.title}', '${ev.time}', '${ev.client}', '${ev.loc}', '${ev.status}', '${ev.notes}')">${ev.title}</div>`;
                            });
                        }

                        gridHtml += `<td class="calendar-cell ${todayClass} fw-bold" onclick="openDayScheduleModal(${dayCounter})">
                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                            <span>${dayCounter}</span>
                                            ${isToday ? '<span class="badge bg-cyan text-white fs-10 px-1">Today</span>' : ''}
                                        </div>
                                        ${eventsHtml}
                                    </td>`;
                        dayCounter++;
                    } else {
                        gridHtml += `<td class="calendar-cell other-month fw-bold">${nextMonthDay++}</td>`;
                    }
                }
                gridHtml += '</tr>';
            }
            gridHtml += '</tbody></table>';

            const container = document.getElementById('monthViewContainer');
            if (container) container.innerHTML = gridHtml;
        }

        function openDayScheduleModal(day) {
            $('#eventDateInput').val(`${currentYear}-08-${day < 10 ? '0' + day : day}`);
            $('#scheduleEventModal').modal('show');
        }

        function switchCalendarView(viewMode, btn) {
            $('#calendarViewToggle button').removeClass('btn-primary').addClass('btn-outline-primary');
            $(btn).removeClass('btn-outline-primary').addClass('btn-primary');

            $('#monthViewContainer, #weekViewContainer, #dayViewContainer').addClass('d-none');
            if (viewMode === 'month') {
                $('#monthViewContainer').removeClass('d-none');
            } else if (viewMode === 'week') {
                $('#weekViewContainer').removeClass('d-none');
            } else if (viewMode === 'day') {
                $('#dayViewContainer').removeClass('d-none');
            }
        }

        function openCalendarEventDetail(title, time, client, location, status, notes) {
            $('#eventDetailHeaderTitle').text(title || 'Appointment Details');
            $('#eventDetailTime').text(time || '10:00 AM');
            $('#eventDetailClient').text(client || 'General Client');
            $('#eventDetailLocation').text(location || 'Office / Zoom');
            $('#eventDetailStatus').text(status || 'Confirmed');
            $('#eventDetailNotes').text(notes || 'No additional notes.');
            $('#eventDetailNewNoteInput').val('');
            $('#calendarEventDetailModal').modal('show');
        }

        function handleSaveDetailNote() {
            const newNote = $('#eventDetailNewNoteInput').val().trim();
            if (!newNote) return;
            const currentNotes = $('#eventDetailNotes').text().trim();
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const updatedNotes = currentNotes + '\n[' + timeStr + '] ' + newNote;
            $('#eventDetailNotes').text(updatedNotes);
            $('#eventDetailNewNoteInput').val('');
        }

        function navigateMonth(step) {
            if (step === 0) {
                currentMonthIdx = 7;
                currentYear = 2026;
            } else {
                currentMonthIdx += step;
                if (currentMonthIdx > 11) {
                    currentMonthIdx = 0;
                    currentYear++;
                } else if (currentMonthIdx < 0) {
                    currentMonthIdx = 11;
                    currentYear--;
                }
            }
            renderMonthGrid();
        }

        function handleAddNewAppointment() {
            const title = $('#eventTitleInput').val().trim();
            const client = $('#eventClientInput').val() || 'Valued Client';
            const time = $('#eventTimeInput').val() || '11:00 AM';
            const loc = $('#eventLocationInput').val().trim() || 'Zoom Video Call';
            const notes = $('#eventNotesInput').val().trim() || 'Newly scheduled appointment.';

            if (!title) return;

            const safeTitle = title.replace(/'/g, "\\'");
            const safeClient = client.replace(/'/g, "\\'");
            const safeLoc = loc.replace(/'/g, "\\'");
            const safeNotes = notes.replace(/'/g, "\\'");

            $('#agendaListContainer').prepend(`
                <div class="p-3 bg-soft-primary rounded border border-primary-subtle cursor-pointer" onclick="openCalendarEventDetail('${safeTitle}', '${time}', '${safeClient}', '${safeLoc}', 'Scheduled', '${safeNotes}')">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                        <span class="badge bg-primary fs-11">${time}</span>
                        <span class="text-muted fs-11"><i class="feather-video me-1"></i> ${loc}</span>
                    </div>
                    <div class="fw-bold text-dark fs-13">${title}</div>
                    <div class="text-muted fs-12 mt-1">Client: ${client}</div>
                    <div class="text-muted fs-11 mt-1 text-truncate"><i class="feather-file-text me-1"></i>${notes}</div>
                </div>
            `);

            $('#scheduleEventForm')[0].reset();
            const modalEl = document.getElementById('scheduleEventModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }

        $(document).ready(function () {
            renderMonthGrid();
        });
