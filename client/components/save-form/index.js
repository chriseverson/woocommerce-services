import React, { PropTypes } from 'react';
import FormButton from 'components/forms/form-button';
import FormButtonsBar from 'components/forms/form-buttons-bar';
import { translate as __ } from 'lib/mixins/i18n';

const SaveForm = ( { saveForm, isSaving } ) => {
	return (
		<FormButtonsBar>
			<FormButton type="button" onClick={ saveForm }>
				{ isSaving ? __( 'Saving...' ) : __( 'Save changes' ) }
			</FormButton>
		</FormButtonsBar>
	);
};

SaveForm.propTypes = {
	saveForm: PropTypes.func.isRequired,
	isSaving: PropTypes.bool,
};

export default SaveForm;
