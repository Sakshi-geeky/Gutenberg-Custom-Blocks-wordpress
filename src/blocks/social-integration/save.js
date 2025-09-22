import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { displayType, platforms, showLabels, style, shareText } = attributes;

    return (
        <div {...blockProps}>
            <div 
                className="agb-social-integration"
                data-display-type={displayType}
                data-platforms={JSON.stringify(platforms)}
                data-show-labels={showLabels}
                data-style={style}
                data-share-text={shareText}
            >
                <div className="agb-social-container">
                    {/* Social content will be loaded via PHP/JavaScript */}
                </div>
            </div>
        </div>
    );
}
