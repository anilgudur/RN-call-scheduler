import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { taskListActions } from '../../store/actions/taskListActions';
import TaskListScreen from '../../components/Task/TaskListScreen';

export default connect(
  store => ({ ...store.task }),
  dispatch => (bindActionCreators({ ...taskListActions }, dispatch))
)(TaskListScreen);