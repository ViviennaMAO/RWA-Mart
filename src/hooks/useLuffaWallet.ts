import { useState, useEffect, useCallback } from 'react';
import type { LuffaUserInfo, LuffaConnectParams } from '../types/luffa';

const STORAGE_KEY = 'luffa_wallet';

export function useLuffaWallet() {
    const [address, setAddress] = useState<string | null>(null);
    const [nickname, setNickname] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Helper to check Luffa environment
    const isLuffaEnv = useCallback(() => {
        return typeof window !== 'undefined' && (
            window.__wxjs_environment === 'miniprogram' ||
            /Luffa/i.test(navigator.userAgent)
        );
    }, []);

    const connect = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!window.luffa) {
                console.warn('Luffa SDK not found');
                // Mock connection for dev environment if not in Luffa
                if (!isLuffaEnv()) {
                    const mockData = {
                        address: '0x71C...9A21',
                        nickname: 'Demo User',
                        avatar: '',
                        uid: '123456'
                    };
                    handleLoginSuccess(mockData);
                    return;
                }
                return;
            }

            const params: LuffaConnectParams = {
                api_name: 'luffaWebRequest',
                methodName: 'connect',
                uuid: crypto.randomUUID(),
                network: 'endless',
                metadata: {
                    icon: window.location.origin + '/vite.svg',
                    url: window.location.origin,
                },
            };

            const res = await window.luffa.luffaWebRequest(params);
            if (res && res.code === 0 && res.data) {
                handleLoginSuccess(res.data);
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLuffaEnv]);

    const handleLoginSuccess = (data: Partial<LuffaUserInfo>) => {
        if (data.address) {
            setAddress(data.address);
            setNickname(data.nickname || 'User');
            setIsConnected(true);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    };

    const disconnect = useCallback(() => {
        setAddress(null);
        setNickname(null);
        setIsConnected(false);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Auto-connect from storage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                handleLoginSuccess(data);
            } catch (e) {
                console.error('Failed to parse wallet data', e);
            }
        }
        setIsLoading(false);
    }, []);

    return {
        address,
        nickname,
        isConnected,
        isLoading,
        connect,
        disconnect,
        isLuffaEnv: isLuffaEnv()
    };
}
