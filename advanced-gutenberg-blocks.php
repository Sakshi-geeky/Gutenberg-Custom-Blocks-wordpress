<?php
/**
 * Plugin Name: Advanced Gutenberg Blocks Suite
 * Plugin URI: https://github.com/Sakshi-geeky/gutenberg-blocks
 * Description: Professional suite of advanced Gutenberg blocks featuring interactive data visualization, e-commerce product showcase, and social media integration blocks.
 * Version: 1.0.0
 * Author: Sakshi Chavan
 * Author URI: https://github.com/Sakshi-geeky
 * License: GPL v2 or later
 * Text Domain: advanced-gutenberg-blocks
 * Requires at least: 6.0
 * Tested up to: 6.4
 * Requires PHP: 8.0
 */

if (!defined('ABSPATH')) {
    exit('Direct access denied.');
}

define('AGB_PLUGIN_FILE', __FILE__);
define('AGB_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('AGB_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AGB_VERSION', '1.0.0');

class AdvancedGutenbergBlocks {
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', array($this, 'init'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'));
        add_filter('block_categories_all', array($this, 'register_block_category'));
    }
    
    public function init() {
        $blocks = array('data-visualization');
        
        foreach ($blocks as $block) {
            $block_path = AGB_PLUGIN_DIR . 'build/blocks/' . $block;
            if (file_exists($block_path)) {
                register_block_type($block_path);
            }
        }
    }
    
    public function enqueue_editor_assets() {
        $asset_file = AGB_PLUGIN_DIR . 'build/index.asset.php';
        
        if (file_exists($asset_file)) {
            $asset = include $asset_file;
        } else {
            $asset = array(
                'dependencies' => array('wp-blocks', 'wp-i18n', 'wp-element'),
                'version' => AGB_VERSION
            );
        }
        
        wp_enqueue_script(
            'agb-editor-script',
            AGB_PLUGIN_URL . 'build/index.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );
        
        if (file_exists(AGB_PLUGIN_DIR . 'build/index.css')) {
            wp_enqueue_style(
                'agb-editor-style',
                AGB_PLUGIN_URL . 'build/index.css',
                array('wp-edit-blocks'),
                $asset['version']
            );
        }
    }
    
    public function enqueue_block_assets() {
        if (file_exists(AGB_PLUGIN_DIR . 'build/style-index.css')) {
            wp_enqueue_style(
                'agb-blocks-style',
                AGB_PLUGIN_URL . 'build/style-index.css',
                array(),
                AGB_VERSION
            );
        }
    }
    
    public function register_block_category($categories) {
        return array_merge(
            array(
                array(
                    'slug'  => 'advanced-gutenberg-blocks',
                    'title' => __('Advanced Blocks', 'advanced-gutenberg-blocks'),
                    'icon'  => 'chart-bar',
                ),
            ),
            $categories
        );
    }
}

add_action('plugins_loaded', function() {
    AdvancedGutenbergBlocks::get_instance();
});
