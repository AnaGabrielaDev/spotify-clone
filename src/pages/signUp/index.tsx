import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import Message from "../../components/Message/Message";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backend } from "../../apis/backend";
import { useAuth } from "../../hooks/useAuth";

export function SignUp() {
  const { register, handleSubmit, setValue } = useForm();
  const [isEdition, setIsEdition] = useState(false)

  const nav = useNavigate();
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>('error');
  async function createUser(data: any) {
    const passwordConfirmation = data.password === data.confirmPassword
    if(!passwordConfirmation) {
      setMessage('As senhas não coincidem');
      setType('error');

      return;
    }

    try{
      if(isEdition) {
        await backend.put(`/users`, {
          name: data.name,
          email: data.email,
          password: data.password
        })
              
        logout()
      }else {
        await backend.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password
        })

        setTimeout(() => {
          nav('/')  
        }, 3000)
      }
    }catch(err) {
      setType('error');
      setMessage(`Erro ao ${isEdition ? 'editar' : 'cadastrar'} usuário`);
      return
    }
  }

  const editionLoader = useCallback(() => {
    const userId = pathname.split('/')[1]
    if(!userId) return false
    if(!user) return false

    setIsEdition(true)
    setValue('name', user.name)
    setValue('email', user.email)
  }, [pathname, setValue, user])

  useEffect(() => {
    editionLoader()
  }, [editionLoader])
    
  return (
    <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
      <Header.HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
        {isEdition && <Header.Navigation />}
      </Header.HeaderWrapper>
      {message && <Message type={type} text={message}/>}
      <Form.FormWrapper handleSubmit={handleSubmit(createUser)}>
        <Form.Input label="Nome do usuário" type="text" name="name" register={register} />
        <Form.Input label="E-mail" type="email" name="email" register={register} />
        <Form.Input label="Senha" type="password" name="password" register={register} />
        <Form.Input label="Confirme sua senha" type="password" name="confirmPassword" register={register} />
            
        <div>
          <Form.Button type="submit" text="Continuar" width="400"/>
        </div>
      </Form.FormWrapper> 
    </div>
  )
}