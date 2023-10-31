import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import Message from "../../components/Message/Message";
import { Form } from "../../components/Form";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
    const [message, setMessage] = useState<string>();
    const [type, setType] = useState<string>('error');
    const nav = useNavigate();
    function logIn(ev: React.SyntheticEvent) {
        const username = (document.querySelector("[name='user']") as HTMLInputElement).value;
        const password = (document.querySelector("[name='password']") as HTMLInputElement).value;
        ev.preventDefault();
        type User = {
            username: string,
            nickname: string,
            email: string,
            password: string,
            birthdate: string,
            favGenres: string[],
        }
        axios.get('http://localhost:8000/users').then((resp) => {
            resp.data.forEach((user: User) => {
                if ((user.username == username || user.email == username) && user.password == password) {
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    nav('/');
                }
            });        
        })
    }
    return (
        <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
            <Header.HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
            </Header.HeaderWrapper>
            {message && <Message type={type} text={message} />}
            <Form.FormWrapper handleSubmit={logIn}>
                <Form.Input label="Nome de usuário ou e-mail" type="text" name="user" />
                <Form.Input label="Senha" type="password" name="password" />
                <div>
                    <Form.Button text="Entrar" width="400" handleOnClick={logIn} />
                </div>
            </Form.FormWrapper>
        </div>
    )
}