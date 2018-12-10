import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCallActions } from '../../store/actions/addCallActions';
import CallListScreen from '../../components/Call/CallListScreen';

export default connect(
  store => ({ ...store.call }),
  dispatch => (bindActionCreators({ ...addCallActions }, dispatch))
)(CallListScreen);