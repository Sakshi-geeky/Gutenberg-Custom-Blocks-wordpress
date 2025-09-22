/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { chartType, title, chartData, height } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div 
                className="agb-data-visualization"
                data-chart-type={chartType}
                data-chart-data={JSON.stringify(chartData)}
                data-title={title}
                style={{ height: `${height}px` }}
            >
                {title && <h3>{title}</h3>}
                <div className="agb-chart-container">
                    <canvas className="agb-chart-canvas"></canvas>
                </div>
                
                <noscript>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Label</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartData.map((point, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.label}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </noscript>
            </div>
        </div>
    );
}
