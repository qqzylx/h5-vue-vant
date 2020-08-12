import {
    SET_STRONG_LOADING
} from './mutation-types';
import {Toast} from 'vant';

export default {
    [SET_STRONG_LOADING](state, data) {
        state.strongLoading = !!data;
        if (!data) {
            Toast && Toast.clear();
        }
    },
}
