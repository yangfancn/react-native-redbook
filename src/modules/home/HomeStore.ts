import { request } from "../../utils/Request"
import { makeObservable, observable, action } from "mobx";
import Toast from "react-native-root-toast";
import { save, load } from "../../utils/Storage";

const HomePageSize = 10;

export default class HomeStore {
    page: number = 1;
    
    homeList: ArticleInList[] = [];

    refreshing: boolean = false;

    noMore: boolean = false;

    categoryList: Category[] = [];

    constructor() {
        makeObservable(this, {
            homeList: observable,
            refreshing: observable,
            noMore: observable,
            categoryList: observable,
            updateHomeList: action,
            refreshingStatus: action,
            setNoMore: action,
            setCategoryList: action
        })
    }

    requestHomeList = async (page: number) => {
        if (this.refreshing) {
            return;
        }
        this.page = page;
        try {
            this.refreshingStatus(true);
            const params = {
                page: this.page,
                size: HomePageSize
            };

            const { data } = await request('homeList', params);
            if (data?.length) {
                if (this.page === 1) {
                    this.updateHomeList(data);
                } else {
                    this.updateHomeList([...this.homeList, ...data]);
                }
            } else {
                // Toast.show("没有更多内容了", {

                // })
                this.setNoMore(true);
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.refreshingStatus(false);
        }
    }

    updateHomeList(data: ArticleInList[]): void {
        this.homeList = data;
    }

    refreshingStatus(status: boolean): void {
        this.refreshing = status;
    }

    setNoMore(status: boolean): void {
        this.noMore = status;
    }

    setCategoryList(data: Category[]): void {
        this.categoryList = data;
    }

    getCategoryList = async () => {
        const cacheListStr = await load('categoryList');
        if (cacheListStr) {
            const cacheList = JSON.parse(cacheListStr);
            this.setCategoryList(cacheList ? cacheList : DEFAULT_CATEGORY_LIST);
        } else {
            this.setCategoryList(DEFAULT_CATEGORY_LIST);
        }
    }
}

const DEFAULT_CATEGORY_LIST: Category[] = [
    // 默认添加频道
    { name: '推荐', default: true, isAdd: true },
    { name: '视频', default: true, isAdd: true },
    { name: '直播', default: true, isAdd: true },
    { name: '摄影', default: false, isAdd: true },

    { name: '穿搭', default: false, isAdd: true },
    { name: '读书', default: false, isAdd: true },
    { name: '影视', default: false, isAdd: true },
    { name: '科技', default: false, isAdd: true },

    { name: '健身', default: false, isAdd: true },
    { name: '科普', default: false, isAdd: true },
    { name: '美食', default: false, isAdd: true },
    { name: '情感', default: false, isAdd: true },

    { name: '舞蹈', default: false, isAdd: true },
    { name: '学习', default: false, isAdd: true },
    { name: '男士', default: false, isAdd: true },
    { name: '搞笑', default: false, isAdd: true },

    { name: '汽车', default: false, isAdd: true },
    { name: '职场', default: false, isAdd: true },
    { name: '运动', default: false, isAdd: true },
    { name: '旅行', default: false, isAdd: true },

    { name: '音乐', default: false, isAdd: true },
    { name: '护肤', default: false, isAdd: true },
    { name: '动漫', default: false, isAdd: true },
    { name: '游戏', default: false, isAdd: true },

    // 默认添加频道
    { name: '家装', default: false, isAdd: false },
    { name: '心理', default: false, isAdd: false },
    { name: '户外', default: false, isAdd: false },
    { name: '手工', default: false, isAdd: false },

    { name: '减脂', default: false, isAdd: false },
    { name: '校园', default: false, isAdd: false },
    { name: '社科', default: false, isAdd: false },
    { name: '露营', default: false, isAdd: false },

    { name: '文化', default: false, isAdd: false },
    { name: '机车', default: false, isAdd: false },
    { name: '艺术', default: false, isAdd: false },
    { name: '婚姻', default: false, isAdd: false },

    { name: '家居', default: false, isAdd: false },
    { name: '母婴', default: false, isAdd: false },
    { name: '绘画', default: false, isAdd: false },
    { name: '壁纸', default: false, isAdd: false },

    { name: '头像', default: false, isAdd: false },
];