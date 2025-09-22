import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { chartType, title, chartData, height } = attributes;

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
            </div>
        </div>
    );
}
