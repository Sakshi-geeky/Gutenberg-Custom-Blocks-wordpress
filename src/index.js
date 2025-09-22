/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies - Import all blocks
 */
import './blocks/data-visualization';
import './blocks/product-showcase';
import './blocks/social-integration';

/**
 * Development logging
 */
if (process.env.NODE_ENV === 'development') {
    console.log('Advanced Gutenberg Blocks Suite loaded with 3 blocks!');
    console.log('- Data Visualization (Chart.js)');
    console.log('- Product Showcase (WooCommerce)');
    console.log('- Social Integration');
}
