const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const UPDATE_MEMBERSHIP_STATUS = 'session/updateMembershipStatus'; 


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const updateMembershipStatus = (isMember) => ({ // Action creator for updating membership status
  type: UPDATE_MEMBERSHIP_STATUS,
  payload: isMember
});


export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
    console.log(data, "DATAAA_------------")
    dispatch(setUser(data))
	}
  else{
    const data = await response.json()
    return data.errors
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.log(errorMessages, "ERRORRRSSSSSS")
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};



const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case UPDATE_MEMBERSHIP_STATUS:
        return {
          ...state,
          user: {
            ...state.user,
            isMember: action.payload
          }
        }
    default:
      return state;
  }
}

export default sessionReducer;
