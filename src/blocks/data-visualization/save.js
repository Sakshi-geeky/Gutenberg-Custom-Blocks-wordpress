import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { chartType, title, chartData, height } = attributes;
    const chartId = `agb-chart-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div {...blockProps}>
            <div 
                className="agb-data-visualization"
                data-chart-type={chartType}
                data-chart-data={JSON.stringify(chartData)}
                data-title={title}
                style={{ height: `${height}px` }}
                role="img"
                aria-labelledby={title ? `${chartId}-title` : undefined}
                aria-describedby={`${chartId}-desc`}
            >
                {title && (
                    <h3 id={`${chartId}-title`} className="agb-chart-title">
                        {title}
                    </h3>
                )}
                
                <div className="agb-chart-container">
                    <canvas 
                        className="agb-chart-canvas"
                        role="img"
                        aria-label={`${chartType} chart${title ? ` titled ${title}` : ''}`}
                    ></canvas>
                </div>
                
                {/* Screen reader description */}
                <div id={`${chartId}-desc`} className="screen-reader-text">
                    {`${chartType} chart with ${chartData.length} data points: ${chartData.map(point => `${point.label}: ${point.value}`).join(', ')}`}
                </div>
                
                <noscript>
                    <table className="agb-data-table" role="table">
                        <thead>
                            <tr>
                                <th scope="col">Label</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartData.map((point, index) => (
                                <tr key={index}>
                                    <th scope="row">{point.label}</th>
                                    <td>{point.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </noscript>
            </div>
        </div>
    );
}
