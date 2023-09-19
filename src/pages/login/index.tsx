import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

export function Login() {
    return (
        <>
            <Header.HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
            </Header.HeaderWrapper>
        </>
    )
}