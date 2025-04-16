import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import adminProductsSlice from './admin/productSlice'
import adminOrderSlice from './admin/orderSlice'
import shoppingProductSlice from './shopping/productSlice'
import shoppingCartSlice from './shopping/cartSlice'
import shoppingAddressSlice from './shopping/addressSlice'
import shoppingOrderSlice from './shopping/orderSlice'
import shoppingSearchSlice from './shopping/searchSlice'
import productReviewSlice from './shopping/reviewSlice'
import commonFeatureSlice from './common/featureImageSlice'
import AdminUserDetailsSlice from './admin/userSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrder : adminOrderSlice,
    adminUsersDetails:AdminUserDetailsSlice,
    
    shoppingProducts: shoppingProductSlice,
    shoppingCart: shoppingCartSlice,
    shoppingAddress: shoppingAddressSlice,
    shoppingOrder: shoppingOrderSlice,
    shoppingSearch:shoppingSearchSlice,
    shoppingReview :productReviewSlice,
    commonFeature : commonFeatureSlice
  },
})

export default store;