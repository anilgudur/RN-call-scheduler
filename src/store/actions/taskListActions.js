import { get, has } from 'lodash';

//import { authUser, forgotPassword } from '../../api';
import { appConsts } from '../../constants';

//import OhLogoWhite from '../../../assets/images/OhLogoWhite/OhLogoWhite.png';

const {
  addTodo,
  doneTodo,

  authFail,
  authStart,
  authSuccess,
  clearAuthErr,
  clearUser,
  setLoginData,
  clearLoginData,
  forgotPasswordStart,
  forgotPasswordFail,
  forgotPasswordSuccess,
  forgotPasswordResetData,
  authWithSAML,
  refreshToken,
} = appConsts;

export const taskListActions = {

  /*onDone(todo) {
    console.log("onDone pressed: ", todo);
    // let filteredTodos = this.state.todos.filter((fTodo) => {
    //   return fTodo !== todo; 
    // });
    // this.setState({ todos: filteredTodos });
    store.dispatch({
      type: 'DONE_TODO',
      todo: todo,
    });
  },

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  },*/

  onAddPress(navigation, task) {
    return (dispatch) => {
      // let todos = this.state.todos;
      // todos.push({task: task});
      // this.setState({
      //   todos: todos
      // });
      dispatch({
        type: addTodo,
        task: task
      });
      console.log('A task was added: ', task);
      navigation.goBack();
    };
  },

  onDone(todo) {
    return (dispatch) => {
      console.log("onDone pressed: ", todo);
      // let filteredTodos = this.state.todos.filter((fTodo) => {
      //   return fTodo !== todo; 
      // });
      // this.setState({ todos: filteredTodos });
      dispatch({
        type: doneTodo,
        todo: todo,
      });
    };
  },

  onToggle() {
    console.log('onToggle');
    return (dispatch) => {
      dispatch({
        type: 'TOGGLE_STATE',
      });
    };
  },



  /*login(name, pass) {

    return (dispatch) => {
      dispatch({ type: authStart });
      authUser(name, pass)
      .then((data) => {
        if (data.success) {
          dispatch({ type: authSuccess, payload: prepareBrandData(data) });
        } else {
          dispatch({ type: authFail,  payload: data });
        }
      })
      .catch((e) => {
        let errData = {
          message: e.message,
          data: null,
        };
        dispatch({ type: authFail, payload: errData });
      });
    };
  },
  loginWithSAML(data) {
    return { type: authWithSAML, payload: prepareBrandData(data) };
  },
  clearAuthErr() {
    return { type: clearAuthErr };
  },
  forgotPass(email) {
    return (dispatch) => {
      dispatch({ type: forgotPasswordStart });
      forgotPassword(email)
      .then(result => {
        let errData = {
          message: '',
        };
        console.log(result);
        if (result.success) {
          let text = '';
          const isCorporate = get(result, 'response.isCorporate', false);
          if (isCorporate) {
            text = get(result, 'response.message', '');
          }
          dispatch({ type: forgotPasswordSuccess, payload: { text }});
        } else {
          errData.message = result.message;
          dispatch({ type: forgotPasswordFail, payload: errData });
        }
      })
      .catch((e) => {
        let errData = {
          message: e.message,
          data: null,
        };
        dispatch({ type: forgotPasswordFail, payload: errData });
      });
    };
  },
  forgotPassResetData() {
    return { type: forgotPasswordResetData };
  },
  clearUser() {
    return { type: clearUser };
  },
  setLoginData(type, val) {
    let data = { [type]: val };
    return { type: setLoginData, payload: data };
  },
  clearLoginData() {
    return { type: clearLoginData };
  },
  async refreshToken (email, password) {
    let user = null;
    try {
      const data = await authUser(email, password);
      if (data.success) {
        user = prepareBrandData(data);
        isSuccess = true;
      }
    } catch (e) {
      let errData = {
        message: e.message,
        data: null,
      };
      error = errData;
    }
    return user;
  },
  updateUser(userChanges = {}) {
    console.log( 'Action-----------------', userChanges );
    return {
      type: refreshToken,
      payload: userChanges,
    };
  }*/

};

/*function prepareBrandData(data) {
  const brandMap = {
    oha: {
      logo: {
        src: OhLogoWhite,
        width: 334,
        height: 102,
      },
      backgroundImage: OHBackground,
    },
    mse: {
      logo: {
        src: MSLogo,
        width: 344,
        height: 178,
      },
      backgroundImage: MSBackground,
    },
    bfp: {
      logo: {
        src: BFLogo,
        width: 335,
        height: 135,
      },
      backgroundImage: BFBackground,
    }
  };
  let targetData = data.data.data ? data.data : data;
  let brand = {
      ...targetData,
      brandConfig: brandMap.oha,
  };
  const brandName = get(data, 'data.brand', null);
  if (brandName && typeof brandName === 'string' && has(brandMap, brandName.toLowerCase())) {

    brand.brandConfig = brandMap[brandName.toLowerCase()];
  }
  return brand;
}*/
