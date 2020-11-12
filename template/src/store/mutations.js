import { Toast } from "vant";
import {
    SET_STRONG_LOADING,
} from "./mutation-types";

export default {
    [SET_STRONG_LOADING](state, data) {
        state.strongLoading = !!data;
        if (!data) {
            Toast.clear();
        }
    },
};
