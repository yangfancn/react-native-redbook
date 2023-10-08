import { request } from "../../utils/Request"
import { makeObservable, observable, action } from "mobx";
import Toast from "react-native-root-toast";

export default class ArticleDetailStore {

    detail: Article = {} as Article;
    loading: boolean = true;


    constructor() {
        makeObservable(this, {
            detail: observable,
            loading: observable,
            setDetail: action,
            setLoading: action,
        })
    }

    setDetail = (data: Article) => {
        this.detail = data;
    }

    setLoading = (status: boolean) => {
        this.loading = status;
    }

    requestArticleDetail = async (id: number) => {
        try {
            const params = {
                id: id
            };
            const { data } = await request('articleDetail', params);
            this.setDetail(data);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

}
