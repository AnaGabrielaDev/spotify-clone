import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

export function Home() {
    return (
        <>
        <Header.HeaderWrapper>
            <Logo />
            <Header.Navigation />
        </Header.HeaderWrapper>
        </>
    )
}