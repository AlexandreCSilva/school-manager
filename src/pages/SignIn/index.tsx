import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { signInSchema } from "./schema";
import Menu from "../../components/menu/Menu";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background";
import Box from "../../components/Box";
import Form from "../../components/forms/Form";
import { Container } from "../../components/LayoutComponents";
import BackgroundFormBox from "../../components/BackgroundFormBox";
import BackgroundImage from "../../components/BackgroundImage";

function SignIn() {
  const [ isAble, setIsAble ] = useState(true);
  const [ form, setForm ] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  const navigate = useNavigate();

  function handleForm(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const signIn = async (event: any) => {
    event.preventDefault();

    const validation: any = await signInSchema.validate(form);

    if (validation.error) {
      toast(validation.error.message);
      return;
    }

    const body = {
      name: form.nome,
      email: form.email,
      password: form.senha,
    };

    //postSignIn
    
    setIsAble(false);
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
        </form>
      </Form>
    </Container>
  );
}


export default SignIn;
