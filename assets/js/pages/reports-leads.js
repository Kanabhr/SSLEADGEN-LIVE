/* Page script for reports-leads */
let repReportTable = null;

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Flatpickr Date Range Picker
    const reportDateRangeInput = document.querySelector('#reportDateRange');
    if (reportDateRangeInput && typeof flatpickr !== 'undefined') {
        flatpickr(reportDateRangeInput, {
            mode: "range",
            dateFormat: "d M Y",
            defaultDate: ["2026-01-01", "2026-08-18"]
        });
    }

    repReportTable = $('#repPerformanceTable').DataTable({
        responsive: true,
        pageLength: 5,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Filter report records..."
        }
    });

    const barEl = document.querySelector("#reportSourceBarChart");
    if (barEl && typeof ApexCharts !== "undefined") {
        new ApexCharts(barEl, {
            series: [{ name: "Leads", data: [48, 32, 28, 22, 16] }],
            chart: { type: "bar", height: 260, toolbar: { show: false } },
            colors: ["#00A8B5", "#0B2545", "#F59E0B", "#8B5CF6", "#94A3B8"],
            plotOptions: { bar: { borderRadius: 4, distributed: true, columnWidth: '45%' } },
            xaxis: { categories: ["Web Form", "Referral", "LinkedIn", "Cold Call", "Event"] },
            legend: { show: false }
        }).render();
    }

    const areaEl = document.querySelector("#reportFunnelAreaChart");
    if (areaEl && typeof ApexCharts !== "undefined") {
        new ApexCharts(areaEl, {
            series: [{ name: "Conversion %", data: [40, 52, 64, 78, 89] }],
            chart: { type: "area", height: 260, toolbar: { show: false } },
            colors: ["#00A8B5"],
            xaxis: { categories: ["Apr", "May", "Jun", "Jul", "Aug"] },
            fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0.05 } }
        }).render();
    }

    // Filter Apply Button Feedback
    const btnApply = document.querySelector('#btnApplyReportFilter');
    if (btnApply) {
        btnApply.addEventListener('click', function () {
            const advisor = document.querySelector('#reportAdvisorSelect')?.value;
            if (repReportTable) {
                repReportTable.search(advisor || '').draw();
            }
            btnApply.classList.add('btn-success');
            btnApply.innerHTML = '<i class="feather-check me-1"></i> Applied';
            setTimeout(() => {
                btnApply.classList.remove('btn-success');
                btnApply.innerHTML = '<i class="feather-filter me-1"></i> Apply Filters';
            }, 1200);
        });
    }
});

document.getElementById('mobile-collapse')?.addEventListener('click', function () {
    document.getElementById('mainSidebar')?.classList.toggle('mob-navigation-active');
});
