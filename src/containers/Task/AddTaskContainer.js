import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { addTaskActions } from '../../store/actions/addTaskActions';
import { taskListActions } from '../../store/actions/taskListActions';
import AddTaskScreen from '../../components/Task/AddTaskScreen';

export default connect(
  store => ({ ...store.task }),
  dispatch => (bindActionCreators({ ...taskListActions }, dispatch))
)(AddTaskScreen);