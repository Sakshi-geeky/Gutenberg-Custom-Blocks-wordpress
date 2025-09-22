import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { chartType, chartData } = attributes;

    const addSampleData = () => {
        setAttributes({
            chartData: [
                { label: 'Jan', value: 65 },
                { label: 'Feb', value: 59 },
                { label: 'Mar', value: 80 }
            ]
        });
    };

    return (
        <div {...blockProps}>
            <div style={{ 
                padding: '24px', 
                border: '2px dashed #007cba', 
                borderRadius: '8px', 
                textAlign: 'center' 
            }}>
                <h3>Data Visualization Block</h3>
                <p>Chart Type: {chartType}</p>
                <p>Data Points: {chartData.length}</p>
                <Button onClick={addSampleData} variant="primary">
                    Add Sample Data
                </Button>
            </div>
        </div>
    );
}
