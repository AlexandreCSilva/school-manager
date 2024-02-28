import React, { useState } from 'react';
import styled from "styled-components";
import { IoReorderThree } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Options() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    const navegateOption = (value: string): string => {    
        switch (value){
            case 'home':
                return '/'
            case 'sobre nós':
                return '/about'
            case 'registrar-se':
                return '/sign-up'
            default:
                return '/'
        }
    };

    const options = ["home", "sobre nós", "registrar-se", "login"];

    return(
        <DropDownContainer>
            <div onClick={toggling}>
                <IoReorderThree style={{ fontSize: "4em", color: "#0B7077" }}/>
            </div>
            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {options.map(option => (
                            <ListItem onClick={() => navigate(navegateOption(option))} key={Math.random()}>
                                {option}
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
      </DropDownContainer>
    )
}

const DropDownContainer = styled.div`
    color: #0B7077;
`;

const DropDownListContainer = styled.div`
    font-weight: 700;
    color: #0B7077;
    cursor: pointer;
    font-size: 18px;
`;

const DropDownList = styled.div`
    box-sizing: border-box;
    transition: 0.3s;

    &:first-child {
        padding-top: 3em;
    }

    *:hover {
        font-size: 22px;
    }
`;

const ListItem = styled.li`
    list-style: none;
    margin-bottom: 0.8em;
`;

export default Options;
