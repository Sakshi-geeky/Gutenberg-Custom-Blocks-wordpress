<?php
/**
 * Plugin Name: Advanced Gutenberg Blocks Suite
 * Description: Professional suite of advanced Gutenberg blocks
 * Version: 1.0.0
 * Author: Sakshi Chavan
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AGB_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('AGB_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AGB_VERSION', '1.0.0');

class AdvancedGutenbergBlocks {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_filter('block_categories_all', array($this, 'register_block_category'));
    }
    
    public function init() {
        if (function_exists('register_block_type')) {
            $blocks = array('data-visualization', 'product-showcase', 'social-integration');
            foreach ($blocks as $block) {
                $block_path = AGB_PLUGIN_DIR . 'build/blocks/' . $block;
                if (file_exists($block_path . '/block.json')) {
                    register_block_type($block_path);
                }
            }
        }
    }
    
    public function enqueue_editor_assets() {
        $blocks = array('data-visualization', 'product-showcase', 'social-integration');
        foreach ($blocks as $block) {
            $asset_file = AGB_PLUGIN_DIR . 'build/blocks/' . $block . '/index.asset.php';
            if (file_exists($asset_file)) {
                $asset = include $asset_file;
                wp_enqueue_script(
                    'agb-' . $block,
                    AGB_PLUGIN_URL . 'build/blocks/' . $block . '/index.js',
                    isset($asset['dependencies']) ? $asset['dependencies'] : array('wp-blocks', 'wp-element'),
                    isset($asset['version']) ? $asset['version'] : AGB_VERSION
                );
            }
        }
    }
    
    public function enqueue_frontend_assets() {
        wp_enqueue_script(
            'chartjs',
            'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js',
            array(),
            '4.4.0',
            true
        );
        
        if (file_exists(AGB_PLUGIN_DIR . 'assets/js/frontend.js')) {
            wp_enqueue_script(
                'agb-frontend',
                AGB_PLUGIN_URL . 'assets/js/frontend.js',
                array('chartjs'),
                AGB_VERSION,
                true
            );
        }
    }
    
    public function register_block_category($categories) {
        return array_merge(array(
            array(
                'slug' => 'advanced-gutenberg-blocks',
                'title' => 'Advanced Blocks'
            )
        ), $categories);
    }
}

new AdvancedGutenbergBlocks();
