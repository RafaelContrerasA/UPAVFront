import { useState, useEffect, createContext, ReactNode } from 'react';

interface User {
  id: number | null;
  nombre: string | null;
  apellido_paterno: string | null;
  apellido_materno: string | null;
  rol: number | null;
  correo: string | null;
}

interface UserContextProps {
  user: User;
  updateUser: (user: User) => void;
  sesion: boolean;
  updateSesion: (sesion: boolean) => void;
  tokens: { access: string | null; refresh: string | null };
  updateTokens: (tokens: { access: string | null; refresh: string | null }) => void;
}

const defaultUser: User = {
  id: 0,
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  rol: 0,
  correo: ''
};

export const UserContext = createContext<UserContextProps>({
  user: defaultUser,
  updateUser: () => {},
  sesion: false,
  updateSesion: () => {},
  tokens: { access: '', refresh: '' },
  updateTokens: () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [sesion, setSesion] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{ access: string | null; refresh: string | null }>({ access: null, refresh: null });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTokens = localStorage.getItem('tokens');
    const storedSesion = localStorage.getItem('sesion');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
    }
    if (storedSesion) {
      setSesion(storedSesion === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem('sesion', sesion.toString());
  }, [sesion]);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const updateSesion = (newSesion: boolean) => {
    setSesion(newSesion);
  };

  const updateTokens = (newTokens: { access: string | null; refresh: string | null }) => {
    setTokens(newTokens);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, sesion, updateSesion, tokens, updateTokens }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
