/** @format */

/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';
import formatCurrency from '@automattic/format-currency';

/**
 * Internal dependencies
 */
import Tooltip from 'components/tooltip';
import { getTotalPriceBreakdown } from 'woocommerce/woocommerce-services/state/shipping-label/selectors';

class PriceSummary extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			tooltipVisible: false,
		};
	}

	showTooltip = () => {
		this.setState( { tooltipVisible: true } );
	};

	hideTooltip = () => {
		this.setState( { tooltipVisible: false } );
	};

	setTooltipContext = tooltipContext => {
		if ( tooltipContext ) {
			this.setState( { tooltipContext } );
		}
	};

	renderDiscountExplanation = () => {
		const { translate } = this.props;
		return (
			<div className="label-purchase-modal__price-item-help">
				<Gridicon
					ref={ this.setTooltipContext }
					icon="help-outline"
					onMouseEnter={ this.showTooltip }
					onMouseLeave={ this.hideTooltip }
					size={ 18 }
				/>
				<Tooltip
					className="label-purchase-modal__price-item-tooltip is-dialog-visible"
					isVisible={ this.state.tooltipVisible }
					context={ this.state.tooltipContext }
				>
					{ translate(
						'WooCommerce Services gives you access to USPS ' +
							'Commercial Pricing, which is discounted over Retail rates.'
					) }
				</Tooltip>
			</div>
		);
	};

	renderRow = ( itemName, itemCost, key, isTotal, isDiscount ) => {
		const className = classNames( 'label-purchase-modal__price-item', {
			'label-purchase-modal__price-item-total': isTotal,
		} );
		return (
			<div key={ key } className={ className }>
				<div className="label-purchase-modal__price-item-name">{ itemName }</div>
				{ isDiscount && this.renderDiscountExplanation() }
				<div className="label-purchase-modal__price-item-amount">
					{ formatCurrency( itemCost, 'USD' ) }
				</div>
			</div>
		);
	};

	render() {
		const { priceBreakdown, translate } = this.props;
		if ( ! priceBreakdown ) {
			return null;
		}

		const { prices, discount, total } = priceBreakdown;

		return (
			<div className="label-purchase-modal__shipping-summary-section">
				<hr />
				{ prices.map( ( service, index ) => {
					const title = translate( 'Package %(index)s', {
						args: {
							index: index + 1,
						}
					} );
					return (
						<Fragment key={ index }>
							{ this.renderRow( title, service.retailRate, index ) }
							{ service.addons.map( ( addon, addonIndex ) =>
								<div key={ 'addons-' + index } className="label-purchase-modal__price-item-addons">
									{ this.renderRow( addon.title, addon.rate, 'addon-' + addonIndex ) }
								</div>
							) }
						</Fragment>
					);
				} ) }
				{ 0 < discount
					? this.renderRow( translate( 'You save' ), -discount, 'discount', false, true )
					: null }
				{ this.renderRow( translate( 'Total' ), total, 'total', true ) }
			</div>
		);
	}
}

PriceSummary.propTypes = {
	siteId: PropTypes.number.isRequired,
	orderId: PropTypes.number.isRequired,
};

export default connect( ( state, { orderId, siteId } ) => {
	const priceBreakdown = getTotalPriceBreakdown( state, orderId, siteId );
	return {
		priceBreakdown,
	};
} )( localize( PriceSummary ) );
