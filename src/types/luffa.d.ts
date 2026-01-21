export interface LuffaUserInfo {
    address: string;
    nickname: string;
    avatar: string;
    uid: string;
}

export interface LuffaConnectParams {
    api_name: string;
    methodName: string;
    uuid: string;
    network?: string;
    metadata?: {
        icon: string;
        url: string;
    };
}

export interface LuffaResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

export interface LuffaSDK {
    luffaWebRequest: <T = any>(params: LuffaConnectParams & any) => Promise<LuffaResponse<T>>;
    getAccount: () => Promise<string>;
    sendTransaction: (params: any) => Promise<any>;
}

declare global {
    interface Window {
        luffa?: LuffaSDK;
        // WeChat Mini Program Environment
        __wxjs_environment?: string;
    }
}
