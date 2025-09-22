document.addEventListener('DOMContentLoaded', function() {
    const chartContainers = document.querySelectorAll('.agb-data-visualization');
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('.agb-chart-canvas');
        if (!canvas) return;
        
        const chartType = container.dataset.chartType || 'bar';
        const chartDataRaw = container.dataset.chartData;
        const title = container.dataset.title;
        
        let chartData = [];
        try {
            chartData = JSON.parse(chartDataRaw || '[]');
        } catch (e) {
            console.error('Invalid chart data:', e);
            return;
        }
        
        if (chartData.length === 0) return;
        
        const ctx = canvas.getContext('2d');
        
        const colors = [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)', 
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ];
        
        const borderColors = colors.map(color => color.replace('0.8', '1'));
        
        const config = {
            type: chartType,
            data: {
                labels: chartData.map(item => item.label),
                datasets: [{
                    label: title || 'Dataset',
                    data: chartData.map(item => item.value),
                    backgroundColor: colors.slice(0, chartData.length),
                    borderColor: borderColors.slice(0, chartData.length),
                    borderWidth: 2,
                    tension: chartType === 'line' ? 0.4 : 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: !!title,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 6
                    }
                },
                scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    },
                    x: {
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    }
                } : {},
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        };
        
        new Chart(ctx, config);
    });
});
