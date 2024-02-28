import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { signUpSchema } from "./schema";
import Menu from "../../components/menu/Menu";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/Form";
import { Container } from "../../components/LayoutComponents";
import BackgroundFormBox from "../../components/BackgroundFormBox";
import BackgroundImage from "../../components/BackgroundImage";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import UserContext from "../../contexts/UserContext";
import { FaGoogle } from "react-icons/fa";

function SignUp() {
  const { setUserData } = useContext(UserContext);
  const [ isAble, setIsAble ] = useState(true);
  const [ form, setForm ] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function handleForm(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const googleSignUp = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsAble(false)

    try {
      await signUpSchema.validate(form);
    } catch (error: any) {
      toast(error.message);
      setIsAble(true);
      return;
    }

    const body = {
      name: form.nome,
      email: form.email,
      password: form.senha,
    };

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user
        toast('Login realizado com sucesso!')
        setUserData(user)
        navigate('/sign-in')
      })
      .catch((error) => {
        toast(error.message);
        setIsAble(true);
        return;
      })

    
    setIsAble(true);
  }

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAble(false)

    try {
      await signUpSchema.validate(form);
    } catch (error: any) {
      toast(error.message);
      setIsAble(true);
      return;
    }

    const body = {
      name: form.nome,
      email: form.email,
      password: form.senha,
    };

    createUserWithEmailAndPassword(auth, body.email, body.password)
      .then((userCredential) => {
        const user = userCredential.user
        toast('Login realizado com sucesso!')
        setUserData(user)
        navigate('/sign-in')
      })
      .catch((error) => {
        toast(error.message);
        setIsAble(true);
        return;
      })

    
    setIsAble(true);
  };

  return (
    <Container>
      <Menu>
        <a onClick={() => navigate('/')}> home </a>
        <a onClick={() => navigate('/about')}> sobre nós </a>

        <div className='division'/>

        <a className="emphasis" onClick={() => navigate('/sign-up')}> registrar-se </a>
        <button onClick={() => navigate('/sign-in')}> Login </button>
      </Menu>

      <BackgroundImage />
      <BackgroundFormBox />

      <Form>
        <form onSubmit={signUp}>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleForm}
            placeholder="Nome"
            disabled={!isAble}
          />
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleForm}
            placeholder="E-mail"
            disabled={!isAble}
          />
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleForm}
            placeholder="Senha"
            disabled={!isAble}
          />
          <input
            type="password"
            name="confirmaSenha"
            value={form.confirmaSenha}
            onChange={handleForm}
            placeholder="Confirme sua senha"
            disabled={!isAble}
          />

          <button type="submit">
            {isAble ? (
            "Inscreva-se"
            ) : (
            "loading"
            )}
          </button>

          <button className='google' type='button' onClick={(e) => { googleSignUp(e) }}>
            {isAble ? (
              <FaGoogle />
            ) : (
            "loading"
            )}
          </button>
        </form>
      </Form>
    </Container>
  );
}


export default SignUp;
