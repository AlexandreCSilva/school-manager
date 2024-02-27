import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { signUpSchema } from "./schema";
import Menu from "../../components/menu/Menu";
import { useNavigate } from "react-router-dom";
import { InputStyle } from "../../components/Input";

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
    <Wrapper>
        <Menu>
            <a onClick={() => navigate('/')}> home </a>
            <a onClick={() => navigate('/about')}> sobre nós </a>

            <div className='division'/>

            <a className="emphasis" onClick={() => navigate('/sign-up')}> registrar-se </a>
            <button onClick={() => navigate('/')}> Login </button>
        </Menu>
  
      <div className='content'>
        <InputStyle>
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
        </InputStyle>
      </div>
    </Wrapper>);
  }
  
  const Wrapper = styled.div`
    background-color: #ECF9FF;
    height: 100vh;
  
    .content {
      max-height: 100vh;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
  
      form {
        max-width: 60%;
        width: 100%;
      }
      
      button {
        margin: 10px 0;
        width: 100%;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 10px;
        border-radius: 5px;
        background-color: #0081B4;
        color: white;
        font-weight: 400;
        font-family: 'Mochiy Pop One', sans-serif;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
        font-size: 20px;
        -webkit-transition: -webkit-transform 0.2s;
        transition: -webkit-transform 0.2s;
        transition: transform 0.2s;
        transition: transform 0.2s, -webkit-transform 0.2s;
      }
  
      button:hover {
        -webkit-transform: scale(1, 1.1);
        transform: scale(1, 1.1);
        cursor: pointer;
      }
    }
`;

export default SignUp;
