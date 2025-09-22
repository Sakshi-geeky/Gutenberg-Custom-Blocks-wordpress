/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    TextControl, 
    Button, 
    NumberControl 
} from '@wordpress/components';
import { plus, trash } from '@wordpress/icons';

const CHART_TYPES = [
    { label: __('Bar Chart', 'advanced-gutenberg-blocks'), value: 'bar' },
    { label: __('Line Chart', 'advanced-gutenberg-blocks'), value: 'line' },
    { label: __('Pie Chart', 'advanced-gutenberg-blocks'), value: 'pie' }
];

export default function Edit({ attributes, setAttributes }) {
    const { chartType, title, chartData, height } = attributes;
    const blockProps = useBlockProps();

    const addDataPoint = () => {
        const newData = [
            ...chartData,
            { label: `Item ${chartData.length + 1}`, value: Math.floor(Math.random() * 100) }
        ];
        setAttributes({ chartData: newData });
    };

    const updateDataPoint = (index, field, value) => {
        const newData = [...chartData];
        if (field === 'value') {
            newData[index][field] = parseFloat(value) || 0;
        } else {
            newData[index][field] = value;
        }
        setAttributes({ chartData: newData });
    };

    const removeDataPoint = (index) => {
        const newData = chartData.filter((_, i) => i !== index);
        setAttributes({ chartData: newData });
    };

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
                        placeholder={__('Enter chart title...', 'advanced-gutenberg-blocks')}
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
                        <div key={index} style={{ 
                            display: 'flex', 
                            gap: '8px', 
                            marginBottom: '12px',
                            padding: '12px',
                            background: '#f8f9fa',
                            borderRadius: '4px'
                        }}>
                            <TextControl
                                label={__('Label', 'advanced-gutenberg-blocks')}
                                value={point.label}
                                onChange={(value) => updateDataPoint(index, 'label', value)}
                                style={{ flex: 1 }}
                            />
                            <NumberControl
                                label={__('Value', 'advanced-gutenberg-blocks')}
                                value={point.value}
                                onChange={(value) => updateDataPoint(index, 'value', value)}
                                style={{ flex: 1 }}
                            />
                            <Button
                                icon={trash}
                                onClick={() => removeDataPoint(index)}
                                isDestructive
                                size="small"
                            />
                        </div>
                    ))}
                    
                    <Button
                        icon={plus}
                        onClick={addDataPoint}
                        variant="secondary"
                        style={{ width: '100%' }}
                    >
                        {__('Add Data Point', 'advanced-gutenberg-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={{ 
                    padding: '24px',
                    border: '2px dashed #007cba',
                    borderRadius: '8px',
                    textAlign: 'center',
                    background: '#f8f9fa'
                }}>
                    {title && <h3 style={{ marginBottom: '16px' }}>{title}</h3>}
                    
                    <div style={{ height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <p><strong>Chart Type:</strong> {chartType}</p>
                            <p><strong>Data Points:</strong> {chartData.length}</p>
                            {chartData.length === 0 && (
                                <Button onClick={addDataPoint} variant="primary">
                                    {__('Add First Data Point', 'advanced-gutenberg-blocks')}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
