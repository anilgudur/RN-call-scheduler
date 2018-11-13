import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCallActions } from '../../store/actions/addCallActions';
import RecurringScreen from '../../components/Call/RecurringScreen';

export default connect(
  store => ({ ...store.call }),
  dispatch => (bindActionCreators({ ...addCallActions }, dispatch))
)(RecurringScreen);