//import {UserInfo} from './model/user';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
  private static instance: AppGlobal = new AppGlobal();

  /**是否是调试状态 */
  isDebug = true;
  server: string = this.isDebug ? 'http://localhost' : 'http://www.xxx.com';

  apiUrl = '/MobileApi/api';

  /**当前用户信息 */
  currentUserInfo: any;
  /**分页页数 */
  pageSize = 10;

  //获取当前实例
  public static getInstance(): AppGlobal {
    return AppGlobal.instance;
  }

  constructor() {
    if (AppGlobal.instance) {
      throw new Error('错误: 请使用AppGlobal.getInstance() 代替使用new.');
    }
    AppGlobal.instance = this;
  }
}
