<?php
if (! defined('ABSPATH')) {
    exit;
}
?>

<div class="pcafe_spf_container">
    <div class="pcafe_spf_header">
        <div class="pcafe_spf_box">
            <div class="pcafe_spf_logo">
                <img src="<?php echo esc_url(PCAFE_SPF_URL . 'assets/img/SPF.svg'); ?>" alt="logo">
                <span>Smart Phone Field</span>
            </div>
            <div class="plugin_ads"></div>
        </div>
    </div>
    <div class="pcafe_body_wrapper">
        <div class="pcafe_spf_menu">
            <div class="pcafe_main_tab">
                <ul class="pcafe_tab_menu">
                    <li class="tab_list" data-tabscrollnavi="general">
                        <a href="#general" class="tab_item"><?php esc_html_e('General', 'smart-phone-field-for-wp-forms'); ?></a>
                    </li>
                    <li class="tab_list" data-tabscrollnavi="settings">
                        <a href="#settings" class="tab_item"><?php esc_html_e('Settings', 'smart-phone-field-for-wp-forms'); ?></a>
                    </li>
                    <li class="tab_list" data-tabscrollnavi="help">
                        <a href="#help" class="tab_item"><?php esc_html_e('Help', 'smart-phone-field-for-wp-forms'); ?></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pcafe_spf_content">
            <div id="addons" class="spf_content" data-tabscroll="general" style="display: none;">
                <?php include plugin_dir_path(__FILE__) . 'addons_list.php'; ?>
            </div>

            <div data-tabscroll="settings" style="display: none;">
                <?php include plugin_dir_path(__FILE__) . 'settings.php'; ?>
            </div>

            <div data-tabscroll="help" style="display: none;">
                <?php include plugin_dir_path(__FILE__) . 'help.php'; ?>
            </div>
        </div>
        <div class="spf_save_notification">
            <div class="spf_notification_content">
                <p><?php esc_html_e('Your changes have been saved sucessfully.', 'smart-phone-field-for-wp-forms'); ?></p>
            </div>
        </div>
    </div>
</div>

<script>
    jQuery(document).ready(function($) {
        $('#spf_default_country').select2();
        $('#spf_restrict_type, #spf_flag_option').select2({
            minimumResultsForSearch: Infinity
        });

        $('#spf_restrict_country').select2({
            placeholder: 'Select Country'
        });
    });
</script>