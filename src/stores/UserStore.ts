import { request } from "../utils/Request";
import { flow } from "mobx";
import { save } from '../utils/Storage';

class UserStore {

    userInfo: any;

    requestLogin = flow(function* (this: UserStore, phone: string, pwd: string, callback: (success: boolean) => void) {
        try {
            const params = {
                name: phone,
                pwd
            };
            const { data } = yield request('login', params);
            if (data) {
                this.userInfo = data;
                save('userInfo', JSON.stringify(data));
                callback?.(true);
            } else {
                this.userInfo = null;
                callback?.(false);
            }
        } catch (e) {
            console.log(e);
            this.userInfo = null;
            callback?.(false);
        }
    });
}

export default new UserStore();