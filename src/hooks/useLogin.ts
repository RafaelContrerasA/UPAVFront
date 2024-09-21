import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';  
import useLogOut from '@/hooks/useLogOut';
import Swal from 'sweetalert2';

const useLogin = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();  
  const logOut = useLogOut();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login(email, password);
    console.log(data);

    if (data) {
      localStorage.setItem('sesion', 'true');
      navigate("/home");
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups, algo salió mal",
        text: "Por favor, revisa tus datos e inténtalo de nuevo.",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('sesion', 'false');
    logOut();
  }, []);

  return {
    email,
    password,
    isLoading,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
};

export default useLogin;
