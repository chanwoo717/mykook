import GoogleLogin from "@/components/service/GoogleLogin";
import NaverLogin from "@/components/service/NaverLogin";
import Link from "next/link";
import {Nerko_One} from "next/font/google"; 

const nerko = Nerko_One({
    preload: false,
    subsets: ['latin'],
    weight: ["400"]
})

export default function Home() {

  return (
    <>
      <div className="Login_page">
        <h1 className={nerko.className}>Kook Kook!</h1>
        <img src="/images/loginImg.png" alt="asdasd" />
        <GoogleLogin/>
        <NaverLogin/>
        <Link href='/home'><div className="b-log"><p>비회원로그인</p></div></Link>
      </div>
    </>
  );
}
