import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, Button, NumberControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';

const CHART_TYPES = [
    { label: __('Bar Chart', 'advanced-gutenberg-blocks'), value: 'bar' },
    { label: __('Line Chart', 'advanced-gutenberg-blocks'), value: 'line' },
    { label: __('Pie Chart', 'advanced-gutenberg-blocks'), value: 'pie' }
];

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { chartType, title, chartData, height } = attributes;
    const [chartInstance, setChartInstance] = useState(null);

    const addDataPoint = () => {
        const newData = [...chartData, { 
            label: `Item ${chartData.length + 1}`, 
            value: Math.floor(Math.random() * 100) + 10 
        }];
        setAttributes({ chartData: newData });
    };

    const updateDataPoint = (index, field, value) => {
        const newData = [...chartData];
        newData[index][field] = field === 'value' ? parseFloat(value) || 0 : value;
        setAttributes({ chartData: newData });
    };

    const removeDataPoint = (index) => {
        const newData = chartData.filter((_, i) => i !== index);
        setAttributes({ chartData: newData });
    };

    // Initialize chart when component mounts or data changes
    useEffect(() => {
        const canvas = document.querySelector(`#chart-${blockProps.id} canvas`);
        if (!canvas || !window.Chart || chartData.length === 0) return;

        // Destroy existing chart
        if (chartInstance) {
            chartInstance.destroy();
        }

        const ctx = canvas.getContext('2d');
        const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099'];

        const newChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: chartData.map(item => item.label),
                datasets: [{
                    label: title || 'Dataset',
                    data: chartData.map(item => item.value),
                    backgroundColor: colors.slice(0, chartData.length),
                    borderColor: colors.slice(0, chartData.length),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: !!title, text: title }
                }
            }
        });

        setChartInstance(newChart);

        return () => {
            if (newChart) newChart.destroy();
        };
    }, [chartType, chartData, title]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Chart Settings', 'advanced-gutenberg-blocks')} initialOpen={true}>
                    <SelectControl
                        label={__('Chart Type', 'advanced-gutenberg-blocks')}
                        value={chartType}
                        options={CHART_TYPES}
                        onChange={(value) => setAttributes({ chartType: value })}
                    />
                    <TextControl
                        label={__('Chart Title', 'advanced-gutenberg-blocks')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <NumberControl
                        label={__('Height (px)', 'advanced-gutenberg-blocks')}
                        value={height}
                        onChange={(value) => setAttributes({ height: parseInt(value) || 400 })}
                        min={200}
                        max={800}
                    />
                </PanelBody>
                
                <PanelBody title={__('Data Points', 'advanced-gutenberg-blocks')} initialOpen={false}>
                    {chartData.map((point, index) => (
                        <div key={index} style={{ marginBottom: '12px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
                            <TextControl
                                label={__('Label', 'advanced-gutenberg-blocks')}
                                value={point.label}
                                onChange={(value) => updateDataPoint(index, 'label', value)}
                            />
                            <NumberControl
                                label={__('Value', 'advanced-gutenberg-blocks')}
                                value={point.value}
                                onChange={(value) => updateDataPoint(index, 'value', value)}
                            />
                            <Button
                                icon={trash}
                                onClick={() => removeDataPoint(index)}
                                isDestructive
                                size="small"
                            />
                        </div>
                    ))}
                    <Button icon={plus} onClick={addDataPoint} variant="secondary">
                        {__('Add Data Point', 'advanced-gutenberg-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={{ padding: '24px', border: '2px solid #007cba', borderRadius: '8px' }}>
                    {title && <h3 style={{ textAlign: 'center' }}>{title}</h3>}
                    
                    <div id={`chart-${blockProps.id}`} style={{ height: `${height}px`, position: 'relative' }}>
                        {chartData.length > 0 ? (
                            <canvas style={{ maxHeight: '100%' }}></canvas>
                        ) : (
                            <div style={{ 
                                height: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                background: '#f8f9fa',
                                border: '2px dashed #ccc'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>Interactive Data Visualization</h4>
                                    <Button onClick={addDataPoint} variant="primary">
                                        Add Sample Data
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
