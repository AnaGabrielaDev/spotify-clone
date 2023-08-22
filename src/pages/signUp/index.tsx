import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { useState } from "react";

export function SignUp() {
    const [proceed, setProceed] = useState<boolean>(true);
    //const favorites = [];
    const genres = ["Jazz", "Pop", "Rock", "Funk", "MPB", "Sertanejo", "K-Pop", "Grunge", "Heavy Metal", "Hard Rock"];
    function toggleSecondScreen() {
        setProceed(!proceed);
    }
    function updateFavorites() {
        console.log("Gênero adicionado!");
    }
    return (
        <div className="bg-gradient-to-tl from-green-950 to-green-500 h-screen text-white">
            <Header.HeaderWrapper>
                <Header.Logo className="" />
            </Header.HeaderWrapper>
            {proceed ?
                <Form.FormWrapper>
                    <Form.Input label="Nome de usuário" type="text" name="username" />
                    <Form.Input label="Senha" type="password" name="password" />
                    <Form.Input label="Confirme sua senha" type="password" name="confirmPassword" />
                    <Form.Input label="Data de Nascimento" type="date" name="birthdate" />
                    <Form.FormWrapper>
                        <Form.Button text="Continuar" width="200" handleOnClick={toggleSecondScreen} />
                    </Form.FormWrapper>
                </Form.FormWrapper>
                :
                <Form.FormWrapper>
                    <Form.Input label="Nome de exibição" type="text" name="displayName" />
                    <div className="max-w-md">
                        <hr className="my-2" />
                        <label>Vamos conhecer mais sobre seu gosto musical!<br /></label>
                        {genres.map((genre: string) => (
                            <Form.Button text={genre} width="100" handleOnClick={updateFavorites} />
                        ))}
                        <hr className="my-2" />
                    </div>
                    <Form.Checkbox label="Concordo com os termos de serviço." name="termsOfService" />
                    <Form.Checkbox label="Concordo em receber e-mails sobre novidades e ofertas." name="emails" />
                    <Form.FormWrapper>
                        <Form.Button text="Registrar-se" width="200" handleOnClick={toggleSecondScreen} />
                    </Form.FormWrapper>
                </Form.FormWrapper>
            }
        </div>

    )
}