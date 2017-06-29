import {AuthInfoService} from '../auth-info/auth-info.service';

//全局变量工具类，单例模式
export class ServiceUtil {
  private static instance: ServiceUtil = new ServiceUtil();

  private static authInfoService: AuthInfoService = null;

  /**
   * 获取当前实例
   * @returns {ServiceUtil}
   */
  public static getInstance(): ServiceUtil {
    return ServiceUtil.instance;
  }

  /**
   * 获取AuthInfoService
   * @returns {AuthInfoService}
   */
  public static getAuthInfoService(): AuthInfoService {
    return ServiceUtil.authInfoService;
  }

  /**
   * 设置AuthInfoService
   * @param authInfoService
   */
  public static setAuthInfoService(authInfoService: AuthInfoService) {
    ServiceUtil.authInfoService = authInfoService;
  }

  constructor() {
    if (ServiceUtil.instance) {
      throw new Error('错误: 请使用AppGlobal.getInstance() 代替使用new.');
    }
    ServiceUtil.instance = this;
  }

}
