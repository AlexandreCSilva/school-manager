import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { signUpSchema } from "./schema";
import Menu from "../../components/menu/Menu";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background";
import Box from "../../components/Box";
import Form from "../../components/forms/Form";
import { Container } from "../../components/LayoutComponents";
import BackgroundFormBox from "../../components/BackgroundFormBox";
import BackgroundImage from "../../components/BackgroundImage";

function SignUp() {
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

  const signUp = async (event: any) => {
    event.preventDefault();

    const validation: any = await signUpSchema.validate(form);

    if (validation.error) {
      toast(validation.error.message);
      return;
    }

    const body = {
      name: form.nome,
      email: form.email,
      password: form.senha,
    };

    //postSignUp
    
    setIsAble(false);
  };

  return (
    <Container>
      <Menu>
        <a onClick={() => navigate('/')}> home </a>
        <a onClick={() => navigate('/about')}> sobre nós </a>

        <div className='division'/>

        <a className="emphasis" onClick={() => navigate('/sign-up')}> registrar-se </a>
        <button onClick={() => navigate('/')}> Login </button>
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
        </form>
      </Form>
    </Container>
  );
}


export default SignUp;
