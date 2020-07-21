export default (state,action) => {

    switch (action.type){
        case 'CHANGE_GLOBAL_STATE':
            return(action.payload)
        default:
            return state;
    }
}