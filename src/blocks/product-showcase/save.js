import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { layout, columns, showPrice, showRating, showAddToCart, categoryFilter, productLimit } = attributes;

    return (
        <div {...blockProps}>
            <div 
                className="agb-product-showcase"
                data-layout={layout}
                data-columns={columns}
                data-show-price={showPrice}
                data-show-rating={showRating}
                data-show-cart={showAddToCart}
                data-category={categoryFilter}
                data-limit={productLimit}
            >
                <div className="agb-products-container">
                    {/* Products will be loaded via PHP/JavaScript */}
                </div>
            </div>
        </div>
    );
}
