const GET_USER_ADMISSIONS = 'user/getAdmissions'
const DELETE_PURCHASE = 'user/delete/purchase'
const UPDATE_USER_ADMISSION = 'user/purchase/update'


const getUserAdmissions = (admissions)=>({
    type: GET_USER_ADMISSIONS, 
    payload: admissions
})

const updateAdmissionPurchase = (purchase) =>({
    type:UPDATE_USER_ADMISSION, 
    payload: admission
})


const deleteAdmissionPurchase = (id) =>({
    type: DELETE_PURCHASE, 
    payload:id
})

// const updateTicketTypePurchase = (purchase) =>({
//     type: UPDATE_USER_ADMISSION, 
//     payload: purchase
    
// })


// const 


export const getUserAdmissionsThunk = () => async (dispatch)=>{
    const response = await fetch('/api/users/admissions')
    if (response.ok){
        const {Admissions} = await response.json()
        dispatch(getUserAdmissions(Admissions))
    }
    else{
        const data = await response.json()
        console.log(data, "DAKLFJALKSDJLASJLDJSKAJJ")
        return data.message
    }
}

export const deleteAdmissionPurchaseThunk = (purchase) => async(dispatch)=>{
    const {id} = purchase
    const response = await fetch(`/api/users/purchases/${id}`, {method: 'DELETE'})
    if (response.ok){
        const {id} = await response.json()
        dispatch(deleteAdmissionPurchase(id))
    }  else{
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}

function purchaseReducer(state=initialState, action){
    switch(action.type){
        case GET_USER_ADMISSIONS:{
            const newState = {...state}
            action.payload.forEach((purchase)=>newState[purchase.id]=purchase)
            return newState

        }
        case DELETE_PURCHASE:{
            const newState={...state}
            delete newState[action.payload]
            return newState
        }
        default:
        return state
    }
}

export default purchaseReducer