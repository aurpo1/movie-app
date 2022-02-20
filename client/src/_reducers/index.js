//여러 기능에 대한 reducer을 하나로 통합 시켜주는
import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers (
    {
        user
    }
)

export default rootReducer;