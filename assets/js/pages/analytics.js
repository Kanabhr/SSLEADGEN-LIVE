/* Page script for analytics */
document.addEventListener('DOMContentLoaded', function () {
            // Growth Line Chart
            const growthEl = document.querySelector("#analyticsGrowthChart");
            if (growthEl) {
                const growthChart = new ApexCharts(growthEl, {
                    chart: { type: 'area', height: 280, toolbar: { show: false } },
                    series: [{ name: 'Annual Premium ($)', data: [2.1, 2.6, 3.2, 3.8, 4.28] }],
                    xaxis: { categories: ['2022', '2023', '2024', '2025', '2026'] },
                    colors: ['#00A8B5'],
                    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } }
                });
                growthChart.render();
            }

            // Lead Conversion Bar Chart
            const convEl = document.querySelector("#analyticsConversionChart");
            if (convEl) {
                const convChart = new ApexCharts(convEl, {
                    chart: { type: 'bar', height: 280, toolbar: { show: false } },
                    series: [{ name: 'Conversion %', data: [68, 54, 72, 45] }],
                    xaxis: { categories: ['Referral', 'Existing', 'Online', 'Broker'] },
                    colors: ['#2563EB']
                });
                convChart.render();
            }
        });
