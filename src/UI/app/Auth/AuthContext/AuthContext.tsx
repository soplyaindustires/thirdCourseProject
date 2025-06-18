import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { User } from '../../../../repositories/UserRepository/UserRepository.interface';
import { appUserModel } from '../../../../utils/models/models';

type AuthorizationContext = {
    user: User | null;
    /**
     * ошибка не обрабатывается и должна быть словлена в функции обёртке
     * @param password
     * @param username
     * @returns
     */
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const authorizationContext = createContext<AuthorizationContext>({} as AuthorizationContext);

export const AuthContext = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<AuthorizationContext['user']>(null);

    const login = useCallback(
        async (username: string, password: string) => {
            const data = await appUserModel.authorizeUser(username, password);
            setUser(data);
        },
        [user]
    );

    const logout = useCallback(() => setUser(null), [user]);

    return <authorizationContext.Provider value={{ user, login, logout }}>{children}</authorizationContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(authorizationContext);

    return ctx;
};
