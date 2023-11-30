import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { Form } from "../../components/Form";

import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

type Inputs = {
    email: string
    password: string
}

export function Login() {
  const {register, handleSubmit} = useForm<Inputs>()
  const { signIn } = useAuth()

  const nav = useNavigate();
  const login: SubmitHandler<Inputs> = async ({email, password}: Inputs) => {
    const response = await signIn({
      email,
      password
    })

    if(!response.user) {
      alert("Usuário ou senha incorretos")
      return
    }

    nav('/');
  }
  return (
    <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
      <Header.HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
      </Header.HeaderWrapper>
      {/* {message && <Message type={type} text={message} />} */}
      <Form.FormWrapper handleSubmit={handleSubmit(login)}>
        <Form.Input label="Nome de usuário ou e-mail" type="text" register={register} name="email" />
        <Form.Input label="Senha" type="password" register={register} name="password" />
        <div>
          <Form.Button text="Entrar" width="400" type="submit" />
        </div>
      </Form.FormWrapper>
    </div>
  )
}