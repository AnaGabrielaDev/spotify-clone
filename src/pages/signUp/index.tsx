import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { useState } from "react";
import { Logo } from "../../components/Logo";
import Message from "../../components/Message/Message";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backend } from "../../apis/backend";

export function SignUp() {
  const [proceed, setProceed] = useState<boolean>(true);
  const [userData, setUserData] = useState<string[]>([]);
  const { register } = useForm();

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
    async function createUser(ev: React.SyntheticEvent) {
      ev.preventDefault();
      const nickname = (document.querySelector("[name='nickname']") as HTMLInputElement).value;
      userData.push(nickname);
      const user: User = {
        username: userData.shift() as string,
        email: userData.shift() as string,
        password: userData.shift() as string,
        birthdate: userData.shift() as string,
        nickname: userData.shift() as string,
        favGenres: favorites
      }
      await backend.post('/users', user, {headers:{"Content-Type" : "application/json"}})
      setType('success');
      setMessage('Você foi cadastrado com sucesso! Redirecionando...');
      setTimeout(() => {
        nav('/')  
      }, 3000)
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
    }

    function cancelPartialSubmit(ev: React.SyntheticEvent) {
      ev.preventDefault();
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
            <Form.Input label="Nome de usuário" type="text" name="username" register={register} />
            <Form.Input label="E-mail" type="email" name="email" register={register} />
            <Form.Input label="Confirme seu E-mail" type="email" name="confirmEmail" register={register} />
            <Form.Input label="Senha" type="password" name="password" register={register} />
            <Form.Input label="Confirme sua senha" type="password" name="confirmPassword" register={register} />
            <Form.Input label="Data de Nascimento" type="date" name="birthdate" register={register} />
            <div>
              <Form.Button text="Continuar" width="400" handleSubmit
                ={toggleScreen}/>
            </div>
          </Form.FormWrapper>
          :
          <Form.FormWrapper handleSubmit={createUser}>
            <Form.Input label="Nome de exibição" type="text" name="nickname" register={register}/>
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
              <Form.Button text="Criar Conta" width="400" type="submit"/>
            </div>
          </Form.FormWrapper>
        }
      </div>
    )
}