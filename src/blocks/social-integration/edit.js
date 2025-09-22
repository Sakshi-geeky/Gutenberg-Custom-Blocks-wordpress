import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    ToggleControl,
    CheckboxControl,
    TextControl 
} from '@wordpress/components';

const SOCIAL_PLATFORMS = {
    twitter: { name: 'Twitter', color: '#1DA1F2', icon: '🐦' },
    facebook: { name: 'Facebook', color: '#4267B2', icon: '📘' },
    linkedin: { name: 'LinkedIn', color: '#0077B5', icon: '💼' },
    instagram: { name: 'Instagram', color: '#E4405F', icon: '📷' },
    youtube: { name: 'YouTube', color: '#FF0000', icon: '📺' },
    pinterest: { name: 'Pinterest', color: '#BD081C', icon: '📌' }
};

const DISPLAY_TYPES = [
    { label: __('Share Buttons', 'advanced-gutenberg-blocks'), value: 'share' },
    { label: __('Social Feed', 'advanced-gutenberg-blocks'), value: 'feed' },
    { label: __('Follow Buttons', 'advanced-gutenberg-blocks'), value: 'follow' }
];

const STYLE_OPTIONS = [
    { label: __('Buttons', 'advanced-gutenberg-blocks'), value: 'buttons' },
    { label: __('Icons Only', 'advanced-gutenberg-blocks'), value: 'icons' },
    { label: __('Minimal', 'advanced-gutenberg-blocks'), value: 'minimal' }
];

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { displayType, platforms, showLabels, style, shareText } = attributes;

    const togglePlatform = (platform) => {
        const newPlatforms = platforms.includes(platform)
            ? platforms.filter(p => p !== platform)
            : [...platforms, platform];
        setAttributes({ platforms: newPlatforms });
    };

    const renderSocialButton = (platform) => {
        const platformData = SOCIAL_PLATFORMS[platform];
        const buttonStyles = {
            backgroundColor: platformData.color,
            color: 'white',
            border: 'none',
            padding: style === 'icons' ? '12px' : '12px 20px',
            margin: '4px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            textDecoration: 'none'
        };

        if (style === 'minimal') {
            buttonStyles.backgroundColor = 'transparent';
            buttonStyles.color = platformData.color;
            buttonStyles.border = `2px solid ${platformData.color}`;
        }

        return (
            <button key={platform} style={buttonStyles}>
                <span>{platformData.icon}</span>
                {(showLabels && style !== 'icons') && (
                    <span>
                        {displayType === 'share' ? `Share on ${platformData.name}` : 
                         displayType === 'follow' ? `Follow on ${platformData.name}` : 
                         platformData.name}
                    </span>
                )}
            </button>
        );
    };

    const getDisplayTitle = () => {
        switch (displayType) {
            case 'share': return 'Social Share Buttons';
            case 'feed': return 'Social Media Feed';
            case 'follow': return 'Follow Us';
            default: return 'Social Integration';
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Display Settings', 'advanced-gutenberg-blocks')} initialOpen={true}>
                    <SelectControl
                        label={__('Display Type', 'advanced-gutenberg-blocks')}
                        value={displayType}
                        options={DISPLAY_TYPES}
                        onChange={(value) => setAttributes({ displayType: value })}
                    />
                    
                    <SelectControl
                        label={__('Style', 'advanced-gutenberg-blocks')}
                        value={style}
                        options={STYLE_OPTIONS}
                        onChange={(value) => setAttributes({ style: value })}
                    />
                    
                    <ToggleControl
                        label={__('Show Labels', 'advanced-gutenberg-blocks')}
                        checked={showLabels}
                        onChange={(value) => setAttributes({ showLabels: value })}
                    />
                    
                    {displayType === 'share' && (
                        <TextControl
                            label={__('Share Text', 'advanced-gutenberg-blocks')}
                            value={shareText}
                            onChange={(value) => setAttributes({ shareText: value })}
                            placeholder={__('Custom share message...', 'advanced-gutenberg-blocks')}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Social Platforms', 'advanced-gutenberg-blocks')} initialOpen={false}>
                    {Object.keys(SOCIAL_PLATFORMS).map(platform => (
                        <CheckboxControl
                            key={platform}
                            label={`${SOCIAL_PLATFORMS[platform].icon} ${SOCIAL_PLATFORMS[platform].name}`}
                            checked={platforms.includes(platform)}
                            onChange={() => togglePlatform(platform)}
                        />
                    ))}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={{
                    padding: '24px',
                    border: '2px dashed #007cba',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h3 style={{ marginBottom: '20px' }}>{getDisplayTitle()}</h3>
                    
                    {displayType === 'feed' ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px',
                            marginTop: '20px'
                        }}>
                            {platforms.slice(0, 3).map((platform, index) => (
                                <div key={platform} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    backgroundColor: '#fff'
                                }}>
                                    <div style={{ 
                                        fontSize: '24px', 
                                        marginBottom: '8px' 
                                    }}>
                                        {SOCIAL_PLATFORMS[platform].icon}
                                    </div>
                                    <h4 style={{ 
                                        margin: '0 0 8px 0',
                                        color: SOCIAL_PLATFORMS[platform].color 
                                    }}>
                                        {SOCIAL_PLATFORMS[platform].name}
                                    </h4>
                                    <p style={{ 
                                        fontSize: '12px', 
                                        color: '#666',
                                        margin: '0'
                                    }}>
                                        Latest posts will appear here
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ marginTop: '20px' }}>
                            {platforms.map(platform => renderSocialButton(platform))}
                        </div>
                    )}
                    
                    <p style={{ 
                        marginTop: '16px', 
                        fontSize: '14px', 
                        color: '#666' 
                    }}>
                        {platforms.length} platform{platforms.length !== 1 ? 's' : ''} selected • 
                        Style: {style} • Labels: {showLabels ? 'shown' : 'hidden'}
                    </p>
                </div>
            </div>
        </>
    );
}
