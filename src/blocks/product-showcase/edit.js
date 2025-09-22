import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    RangeControl, 
    ToggleControl,
    TextControl 
} from '@wordpress/components';

const LAYOUT_OPTIONS = [
    { label: __('Grid', 'advanced-gutenberg-blocks'), value: 'grid' },
    { label: __('Carousel', 'advanced-gutenberg-blocks'), value: 'carousel' },
    { label: __('List', 'advanced-gutenberg-blocks'), value: 'list' }
];

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { layout, columns, showPrice, showRating, showAddToCart, categoryFilter, productLimit } = attributes;

    // Sample product data for preview
    const sampleProducts = [
        { id: 1, name: 'Premium Headphones', price: '$299', rating: 5, image: 'headphones' },
        { id: 2, name: 'Wireless Speaker', price: '$149', rating: 4, image: 'speaker' },
        { id: 3, name: 'Smart Watch', price: '$399', rating: 5, image: 'watch' },
        { id: 4, name: 'Gaming Mouse', price: '$79', rating: 4, image: 'mouse' },
        { id: 5, name: 'Mechanical Keyboard', price: '$159', rating: 5, image: 'keyboard' },
        { id: 6, name: 'USB-C Hub', price: '$49', rating: 4, image: 'hub' }
    ].slice(0, productLimit);

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const renderProduct = (product, index) => (
        <div key={product.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{
                width: '100%',
                height: '120px',
                backgroundColor: '#ddd',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                fontSize: '12px',
                color: '#666'
            }}>
                📦 {product.image}
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{product.name}</h4>
            {showRating && (
                <div style={{ margin: '4px 0', color: '#ffa500', fontSize: '14px' }}>
                    {renderStars(product.rating)}
                </div>
            )}
            {showPrice && (
                <div style={{ margin: '8px 0', fontWeight: 'bold', color: '#007cba' }}>
                    {product.price}
                </div>
            )}
            {showAddToCart && (
                <button style={{
                    backgroundColor: '#007cba',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                }}>
                    Add to Cart
                </button>
            )}
        </div>
    );

    const getLayoutStyles = () => {
        const baseStyles = {
            padding: '20px',
            border: '2px dashed #007cba',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
        };

        switch (layout) {
            case 'grid':
                return {
                    ...baseStyles,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: '16px'
                };
            case 'carousel':
                return {
                    ...baseStyles,
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '16px'
                };
            case 'list':
                return {
                    ...baseStyles,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                };
            default:
                return baseStyles;
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'advanced-gutenberg-blocks')} initialOpen={true}>
                    <SelectControl
                        label={__('Layout Type', 'advanced-gutenberg-blocks')}
                        value={layout}
                        options={LAYOUT_OPTIONS}
                        onChange={(value) => setAttributes({ layout: value })}
                    />
                    
                    {layout === 'grid' && (
                        <RangeControl
                            label={__('Columns', 'advanced-gutenberg-blocks')}
                            value={columns}
                            onChange={(value) => setAttributes({ columns: value })}
                            min={1}
                            max={6}
                        />
                    )}
                    
                    <RangeControl
                        label={__('Product Limit', 'advanced-gutenberg-blocks')}
                        value={productLimit}
                        onChange={(value) => setAttributes({ productLimit: value })}
                        min={1}
                        max={12}
                    />
                </PanelBody>

                <PanelBody title={__('Display Options', 'advanced-gutenberg-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Price', 'advanced-gutenberg-blocks')}
                        checked={showPrice}
                        onChange={(value) => setAttributes({ showPrice: value })}
                    />
                    
                    <ToggleControl
                        label={__('Show Rating', 'advanced-gutenberg-blocks')}
                        checked={showRating}
                        onChange={(value) => setAttributes({ showRating: value })}
                    />
                    
                    <ToggleControl
                        label={__('Show Add to Cart', 'advanced-gutenberg-blocks')}
                        checked={showAddToCart}
                        onChange={(value) => setAttributes({ showAddToCart: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Filtering', 'advanced-gutenberg-blocks')} initialOpen={false}>
                    <TextControl
                        label={__('Category Filter', 'advanced-gutenberg-blocks')}
                        value={categoryFilter}
                        onChange={(value) => setAttributes({ categoryFilter: value })}
                        placeholder={__('Enter category slug...', 'advanced-gutenberg-blocks')}
                        help={__('Leave empty to show all products', 'advanced-gutenberg-blocks')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <h3>Product Showcase - {layout} layout</h3>
                    <p style={{ color: '#666', fontSize: '14px' }}>
                        {productLimit} products • {showPrice ? 'Prices shown' : 'Prices hidden'} • 
                        {showRating ? 'Ratings shown' : 'Ratings hidden'}
                    </p>
                </div>
                
                <div style={getLayoutStyles()}>
                    {sampleProducts.map((product, index) => renderProduct(product, index))}
                </div>
            </div>
        </>
    );
}
