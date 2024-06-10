// En tu archivo AppContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import NotificationService from '@services/notificationService';

// Definir la forma de la información del usuario y del carrito
interface User {
  id: string;
  name: string;
  email: string;
}


interface CartItem {
  id: number;
  quantity: number;
}

interface NotificationItem {
  id: number;
}

// Crear el contexto con un valor predeterminado
const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  user: null as User | null,
  setUser: (user: User | null) => {},
  cart: [] as CartItem[],
  setCart: (() => {}) as React.Dispatch<React.SetStateAction<CartItem[]>>,
  isAdmin: false,
  setIsAdmin: (value: boolean) => {},
  isCartOpen: false,
  onOpenCartChange: (value: boolean) => {},
  onOpenCart : () => {},
  notifications: [] as NotificationItem[],
  setNotifications: (() => {}) as React.Dispatch<React.SetStateAction<NotificationItem[]>>,
  webTitle: 'POWERFUEL',
  setWebTitle: (value: string) => {},
  isAuthOpen: false,
  setIsAuthOpen: (value: boolean) => {},
  onOpenAuthMenu: (value: boolean) => {}
});

// Crear el proveedor de contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [webTitle, setWebTitle] = useState('POWERFUEL');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const onOpenAuthMenu = (value: boolean = !isAuthOpen) => {
    setIsAuthOpen(value);
  }

  const onOpenCartChange = (value: boolean) => {
    setIsCartOpen(value);
  }

  const onOpenCart = () => {
    setIsCartOpen(true);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  useEffect(() => {
    if (cart.length > 0 ) { 
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    if(cart.length === 0) {
      localStorage.removeItem('cart');
    }

  }, [cart]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && token != "" && !user) {
        setIsLoggedIn(true);
        const fetchUserInfo = async () => {
            const userInfo = await UserService.getUserInfo();
            const roleResponse = await RoleService.getRoleByUserId();
            const notificationResponse = await NotificationService.getNotificationsByUser();
            setNotifications(notificationResponse);
            setUser(userInfo);
            setIsAdmin(roleResponse.data.role_id !== 10);
            onOpenAuthMenu(false);
        };

        fetchUserInfo();

        
      const intervalId = setInterval(async () => {
        if(localStorage.getItem('auth_token')){
          const notificationResponse = await NotificationService.getNotificationsByUser();
          setNotifications(notificationResponse); 
        }
      }, 30000);

      return () => clearInterval(intervalId);
    } else {
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);
    }
    

}, [isLoggedIn]);

  return (
    <AppContext.Provider 
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          user, setUser,
          cart, setCart,
          isAdmin,
          setIsAdmin,
          isCartOpen,
          onOpenCartChange,
          onOpenCart,
          notifications,
          setNotifications,
          webTitle,
          setWebTitle,
          isAuthOpen,
          setIsAuthOpen,
          onOpenAuthMenu
        }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useAppContext = () => useContext(AppContext);