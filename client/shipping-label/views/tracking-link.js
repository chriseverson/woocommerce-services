/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { sprintf } from 'sprintf-js';
import { translate as __ } from 'i18n-calypso';

const TRACKING_URL_MAP = {
	usps: 'https://tools.usps.com/go/TrackConfirmAction.action?tLabels=%s',
	fedex: 'https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=%s',
};

const TrackingLink = ( { tracking, carrier_id } ) => {
	if ( ! tracking ) {
		return <span>{ __( 'N/A' ) }</span>;
	}
	const url = TRACKING_URL_MAP[ carrier_id ];
	if ( ! url ) {
		return <span>{ tracking }</span>;
	}
	return <a target="_blank" rel="noopener noreferrer" href={ sprintf( url, tracking ) }>{ tracking }</a>;
};

TrackingLink.propTypes = {
	tracking: PropTypes.string,
	carrier_id: PropTypes.string,
};

export default TrackingLink;
