<?php
function agb_render_data_visualization_block($attributes, $content, $block) {
    $chart_id = 'agb-chart-' . wp_generate_uuid4();
    $chart_data = $attributes['chartData'] ?? [];
    $chart_type = $attributes['chartType'] ?? 'bar';
    $title = $attributes['title'] ?? '';
    $height = $attributes['height'] ?? 400;
    
    ob_start();
    ?>
    <div class="wp-block-agb-data-visualization">
        <div 
            class="agb-data-visualization"
            id="<?php echo esc_attr($chart_id); ?>"
            data-chart-type="<?php echo esc_attr($chart_type); ?>"
            data-chart-data="<?php echo esc_attr(wp_json_encode($chart_data)); ?>"
            data-title="<?php echo esc_attr($title); ?>"
            style="height: <?php echo esc_attr($height); ?>px;"
        >
            <?php if ($title): ?>
                <h3 class="agb-chart-title"><?php echo esc_html($title); ?></h3>
            <?php endif; ?>
            
            <div class="agb-chart-container" style="height: <?php echo esc_attr($height - 40); ?>px;">
                <canvas class="agb-chart-canvas"></canvas>
            </div>
            
            <!-- SEO-friendly fallback table -->
            <noscript>
                <table class="agb-chart-data-table">
                    <thead>
                        <tr>
                            <th><?php _e('Item', 'advanced-gutenberg-blocks'); ?></th>
                            <th><?php _e('Value', 'advanced-gutenberg-blocks'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($chart_data as $point): ?>
                            <tr>
                                <td><?php echo esc_html($point['label'] ?? ''); ?></td>
                                <td><?php echo esc_html($point['value'] ?? 0); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </noscript>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// Register the render callback
add_action('init', function() {
    if (function_exists('register_block_type')) {
        register_block_type('agb/data-visualization', array(
            'render_callback' => 'agb_render_data_visualization_block'
        ));
    }
});
