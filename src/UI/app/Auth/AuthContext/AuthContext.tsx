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
    login: (password: string, username: string) => void;
    logout: () => void;
};

const authorizationContext = createContext<AuthorizationContext>({} as AuthorizationContext);

export const AuthContext = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<AuthorizationContext['user']>(null);

    const login = useCallback(
        (password: string, username: string) => {
            appUserModel.authorizeUser(username, password).then(data => setUser(data));
        },
        [user]
    );

    const logout = useCallback(() => setUser(null), [user]);

    return <authorizationContext.Provider value={{ user, login, logout }}></authorizationContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(authorizationContext);

    return ctx;
};
