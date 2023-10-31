import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { Form } from "../../components/Form";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type User = {
    username: string,
    nickname: string,
    email: string,
    password: string,
    birthdate: string,
    favGenres: string[],
}

type Inputs = {
    email: string
    password: string
}

export function Login() {
    const {register, handleSubmit, watch} = useForm<Inputs>()

    // const [message, setMessage] = useState<string>();
    // const [type, setType] = useState<string>('error');
    const nav = useNavigate();
    const login: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await axios.get('http://localhost:3000/users')

        const user = response.data.find((user: User) => {
            return user.username == data.email || user.email == data.email
        })
        if(!user) return

        localStorage.setItem("loggedUser", JSON.stringify(user));
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