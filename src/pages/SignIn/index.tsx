import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { signInSchema } from "./schema";
import Menu from "../../components/menu/Menu";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/Form";
import { Container } from "../../components/LayoutComponents";
import BackgroundFormBox from "../../components/BackgroundFormBox";
import BackgroundImage from "../../components/BackgroundImage";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import UserContext from "../../contexts/UserContext";
import { auth } from "../../firebase/config";

function SignIn() {
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

  const googleSignIn = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsAble(false)

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user
        toast('Login realizado com sucesso!')
        setUserData(user)
        navigate('/dashboard')
      })
      .catch((error) => {
        toast(error.message);
        setIsAble(true);
        return;
      })

    
    setIsAble(true);
  }

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAble(false)

    try {
      await signInSchema.validate(form);
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

    signInWithEmailAndPassword(auth, body.email, body.password)
      .then((userCredential) => {
        const user = userCredential.user
        toast('Login realizado com sucesso!')
        setUserData(user)
        navigate('/dashboard')
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

        <a onClick={() => navigate('/sign-up')}> registrar-se </a>
        <button className="emphasis" onClick={() => navigate('/')}> Login </button>
      </Menu>

      <BackgroundImage />
      <BackgroundFormBox />

      <Form>
        <form onSubmit={signIn}>
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

          <button type="submit">
            {isAble ? (
            "Login"
            ) : (
            "loading"
            )}
          </button>

          <button className='google' type='button' onClick={(e) => { googleSignIn(e) }}>
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


export default SignIn;
