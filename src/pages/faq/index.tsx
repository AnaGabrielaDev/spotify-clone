import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import Question from "../../components/Question";
import Modal from "../../components/Question/modal";

const questionPayments = (
  <>
    <ul className="list-disc">
      <li>Cartão de crédito/débito</li>
      <li>Cartões pré-pagos</li>
      <li>Plano pré-pago</li>
    </ul>
    <br />
    <p>
      <b>Observação:</b> os métodos variam de acordo com o país ou região. Para
      ver as formas de pagamento disponíveis no seu país, clique{" "}
      <a href="http://www.spotify.com/premium">aqui</a> e avance até a página de
      pagamento. Você não receberá nenhuma cobrança até enviar os dados de
      pagamento.
    </p>
  </>
);

const answerForgotPassword = (
  <p>
    Se você não se lembrar da sua senha, use a página de redefinição de senha.
    <br />
    Se não se lembrar do seu e-mail ou nome de usuário, acesse a página de
    redefinição de senha e insira os endereços de e-mail que você pode ter usado
    para criar uma conta. Quando o endereço registrado no Spotify for inserido,
    aparecerá uma mensagem dizendo que o e-mail de redefinição de senha foi
    enviado.
    <br /> <br />
    <b>Observação:</b> existem várias maneiras de se inscrever: usando um
    e-mail, um número de telefone, o Facebook, a Apple ou o Google. Tente fazer
    login usando essas opções para localizar sua conta.
  </p>
);

const answerAlexa = (
  <>
    <ol className="list-decimal">
      <li>Abra o app Alexa.</li>
      <li>Clique em More (Mais), depois em Settings (Configurações).</li>
      <li>
        Em Alexa Preferences (Preferências da Alexa), selecione Music & Podcasts
        (Música e podcasts).
      </li>
      <li>Selecione Link New Service (Vincular novo serviço).</li>
      <li>Selecione Spotify e siga as instruções na tela.</li>
    </ol>
    <p>
      {" "}
      Os serviços de música vinculados ficam em Manage Services (Gerenciar
      serviços).
      <br />
      <br />
      <b>Observação:</b> você ainda precisa dizer “no Spotify” ao final do
      comando para ouvir podcasts.
    </p>
  </>
);
export function Faq() {
  return (
    <>
      <Header.HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <Header.Navigation />
      </Header.HeaderWrapper>
      <div className="h-full min-h-screen pt-8 bg-gradient-to-tl from-green-950 to-green-500">
        <Modal>
          <Question
            question="O que é o Spotify?"
            answer="O Spotify é um serviço de streaming de música, podcast e vídeo digital que oferece acesso a milhões de músicas e outros conteúdos de artistas de todo o mundo."
          ></Question>
          <Question
            question="Formas de pagamento"
            answer={questionPayments}
          ></Question>
          <Question
            question="Não lembro minhas informações de login"
            answer={answerForgotPassword}
          ></Question>
          <Question
            question="Vincular o Spotify à Alexa"
            answer={answerAlexa}
          ></Question>
        </Modal>
      </div>
    </>
  );
}
