import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { useState } from "react";
import { Logo } from "../../components/Logo";
import Message from "../../components/Message/Message";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backend } from "../../apis/backend";

export function SignUp() {
  const { register, handleSubmit } = useForm();

  const nav = useNavigate();

  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>('error');
  async function createUser(data: any) {
    const passwordConfirmation = data.password === data.confirmPassword
    if(!passwordConfirmation) {
      setMessage('As senhas não coincidem');
      setType('error');

      return;
    }

    await backend.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password
    })
    
    setType('success');
    setMessage('Você foi cadastrado com sucesso! Redirecionando...');
    setTimeout(() => {
      nav('/')  
    }, 3000)
  }
    
  return (
    <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
      <Header.HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
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