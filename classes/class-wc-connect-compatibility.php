<?php
/**
 * A class for working around the quirks and different versions of WordPress/WooCommerce
 * This is the base class. Its static members auto-select the correct version to use.
 */

// No direct access please
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WC_Connect_Compatibility' ) ) {

	abstract class WC_Connect_Compatibility {
		private static $singleton;

		/**
		 * @return WC_Connect_Compatibility
		 */
		public static function instance() {
			if ( is_null( self::$singleton ) ) {
				self::$singleton = self::select_compatibility();
			}

			return self::$singleton;
		}

		/**
		 * @return WC_Connect_Compatibility subclass for active version of WooCommerce
		 */
		private static function select_compatibility() {
			if ( version_compare( WC_VERSION, '3.0.0', '<' ) ) {
				require_once 'class-wc-connect-compatibility-wc26.php';
				return new WC_Connect_Compatibility_WC26();
			} else {
				require_once 'class-wc-connect-compatibility-wc30.php';
				return new WC_Connect_Compatibility_WC30();
			}
		}

		/**
		 * Get the ID for a given Order.
		 *
		 * @param WC_Order $order
		 *
		 * @return int
		 */
		abstract public function get_order_id( WC_Order $order );

		/**
		 * Retrieve the corresponding Product for the given Order Item.
		 *
		 * @param WC_Order $order
		 * @param WC_Order_Item|WC_Order_Item_Product|array $item
		 *
		 * @return WC_Product
		 */
		abstract public function get_item_product( WC_Order $order, $item );

		/**
		 * Get formatted list of Product Variations, if applicable.
		 *
		 * @param WC_Product $product
		 * @param bool $flat
		 *
		 * @return string
		 */
		abstract public function get_formatted_variation( WC_Product $product, $flat = false );
	}

}
