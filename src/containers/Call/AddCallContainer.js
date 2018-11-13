import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCallActions } from '../../store/actions/addCallActions';
import AddCallScreen from '../../components/Call/AddCallScreen';

export default connect(
  store => ({ ...store.call }),
  dispatch => (bindActionCreators({ ...addCallActions }, dispatch))
)(AddCallScreen);