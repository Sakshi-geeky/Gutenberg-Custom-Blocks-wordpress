/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies - Import all blocks
 */
import './blocks/data-visualization';

/**
 * Development logging
 */
if (process.env.NODE_ENV === 'development') {
    console.log('Advanced Gutenberg Blocks Suite loaded!');
}
