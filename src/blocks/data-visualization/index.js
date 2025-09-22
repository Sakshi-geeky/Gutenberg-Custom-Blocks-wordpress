/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Register block
 */
registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
    example: {
        attributes: {
            chartType: 'bar',
            title: 'Sample Chart',
            chartData: [
                { label: 'January', value: 65 },
                { label: 'February', value: 59 },
                { label: 'March', value: 80 }
            ]
        }
    }
});
