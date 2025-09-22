document.addEventListener('DOMContentLoaded', function() {
    const chartContainers = document.querySelectorAll('.agb-data-visualization');
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('.agb-chart-canvas');
        if (!canvas || !window.Chart) return;
        
        const chartType = container.dataset.chartType || 'bar';
        const chartDataRaw = container.dataset.chartData;
        const title = container.dataset.title;
        
        let chartData = [];
        try {
            chartData = JSON.parse(chartDataRaw || '[]');
        } catch (e) {
            return;
        }
        
        if (chartData.length === 0) return;
        
        const ctx = canvas.getContext('2d');
        
        const colors = [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)', 
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
        ];
        
        new Chart(ctx, {
            type: chartType,
            data: {
                labels: chartData.map(item => item.label),
                datasets: [{
                    label: title || 'Dataset',
                    data: chartData.map(item => item.value),
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.8', '1')),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: !!title,
                        text: title
                    }
                }
            }
        });
    });
});
