export const initialState = {
    token: localStorage.getItem("token"),
}



const reducer = (state, action) =>{
    
    switch(action.type){
        case "LOGIN":
            localStorage.setItem("token", action.token)
            return{
                ...state,
                token: action.token,
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return{
                ...state,
                token:null,
            }
        default:
        return state
    }
}
export default reducer