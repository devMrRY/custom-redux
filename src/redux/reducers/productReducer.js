const initialState = {
    products: [],
}

const product = (state = initialState, action) => {
    switch(action.type){
        case "ADD_PRODUCTS": 
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        default:
            return state;
    }
}

export default product;