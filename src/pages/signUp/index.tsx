import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { useState } from "react";
import { Logo } from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message/Message";

export function SignUp() {
    const [proceed, setProceed] = useState<boolean>(true);
    const [userData, setUserData] = useState<string[]>([]);
    const nav = useNavigate();
    const favorites: string[] = [];
    const [message, setMessage] = useState<string>();
    const [type, setType] = useState<string>('error');
    const genres = ["Jazz", "Pop", "Rock", "Funk", "MPB", "Sertanejo", "K-Pop", "Grunge", "Heavy Metal", "Hard Rock", "Gospel", "Rap", "Trap", "Hip Hop", "Samba", "Pagode", "Forró", "Eletrônica"];
    type User = {
        username: string,
        nickname: string,
        email: string,
        password: string,
        birthdate: string,
        favGenres: string[],
    }
    function createUser(ev: React.SyntheticEvent) {
        ev.preventDefault();
        const nickname = (document.querySelector("[name='nickname']") as HTMLInputElement).value;
        userData.push(nickname);
        console.log(userData);
        const user: User = {
            username: userData.shift() as string,
            email: userData.shift() as string,
            password: userData.shift() as string,
            birthdate: userData.shift() as string,
            nickname: userData.shift() as string,
            favGenres: favorites
        }
        console.log(user);
        setType('success');
        setMessage('Você foi cadastrado com sucesso! Redirecionando...');
        setTimeout(() => {
            nav('/')  
        }, 3000)
        //
    }

    function toggleScreen() {
        const username = (document.querySelector("[name='username']") as HTMLInputElement).value;
        const email = (document.querySelector("[name='email']") as HTMLInputElement).value;
        const confirmEmail = (document.querySelector("[name='confirmEmail']") as HTMLInputElement).value;
        const password = (document.querySelector("[name='password']") as HTMLInputElement).value;
        const confirmPassword = (document.querySelector("[name='confirmPassword']") as HTMLInputElement).value;
        const birthdate = (document.querySelector("[name='birthdate']") as HTMLInputElement).value;
        if (![username, email, password, birthdate].includes('') && password == confirmPassword && email == confirmEmail) {
            setUserData([username, email, password, birthdate]);
            setProceed(!proceed);
        }
    }
    function updateFavorites(genre: string) {
        if (!favorites.includes(genre)) {
            favorites.push(genre);
        }
        console.log(favorites);
    }
    function cancelPartialSubmit(ev: React.SyntheticEvent) {
        ev.preventDefault();
    }
    function testEmails() {
        const email = (document.querySelector("[name='email']") as HTMLInputElement).value;
        const confirmEmail = (document.querySelector("[name='confirmEmail']") as HTMLInputElement).value;
        if (email != confirmEmail) {
            setType('error');
            setMessage('E-mails não coincidem!');
            console.log("a");
        }
    }
    return (
        <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
            <Header.HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
            </Header.HeaderWrapper>
            {message && <Message type={type} text={message}/>}
            {proceed ?
                <Form.FormWrapper handleSubmit={cancelPartialSubmit}>
                    <Form.Input label="Nome de usuário" type="text" name="username" />
                    <Form.Input label="E-mail" type="email" name="email" />
                    <Form.Input label="Confirme seu E-mail" type="email" handleBlur={testEmails} name="confirmEmail" />
                    <Form.Input label="Senha" type="password" name="password" />
                    <Form.Input label="Confirme sua senha" type="password" name="confirmPassword" />
                    <Form.Input label="Data de Nascimento" type="date" name="birthdate" />
                    <div>
                        <Form.Button text="Continuar" width="400" handleOnClick={toggleScreen}/>
                    </div>
                </Form.FormWrapper>
                :
                <Form.FormWrapper handleSubmit={createUser}>
                    <Form.Input label="Nome de exibição" type="text" name="nickname" />
                    <div className="max-w-md">
                        <hr className="my-2" />
                        <label>Vamos conhecer mais sobre seu gosto musical!<br /></label>
                        {genres.map((genre: string) => (
                            <button key={genre} className={`mx-1 px-1 my-3 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-lg focus:bg-green-500`} type="button" onClick={() => updateFavorites(genre)}>{genre}</button>
                        ))}

                        <hr className="my-2" />
                    </div>
                    <Form.Checkbox label="Concordo com os termos de serviço." name="termsOfService" />
                    <Form.Checkbox label="Concordo em receber e-mails sobre novidades e ofertas." name="emails" />
                    <div>
                    <Form.Button text="Criar Conta" width="400" handleOnClick={createUser}/>
                    </div>
                </Form.FormWrapper>
            }
        </div>
    )
}