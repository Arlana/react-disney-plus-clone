import React from 'react';
import styled from 'styled-components';

function Login() {
    return (
        <div>
            <Container>
                <Content>
                    <LogoOne src="/images/cta-logo-one.svg" alt=""/>
                    <SignUp>GET  ALL THERE</SignUp>
                    <Description>
                    ​Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 05/26/21, the price of Disney+ and The Disney Bundle will increase by $1.
                    </Description>
                    <LogoTwo src="/images/cta-logo-two.png"/>
                </Content>
            </Container>
        </div>
    )
}

export default Login


const Container = styled.div`
    display: flex;
    align-items: top;
    justify-content: center;
    position: relative;
    height: calc(100vh - 70px);

    &:before {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        content: "";
        background-position: top;
        background-size: cover;
        opacity: 0.7;
        backgrouond-repeat: no-repeat;
        background-image: url("/images/login-background.jpg");
        z-index: -1;
    }
`

const Content = styled.div`
    max-width: 650px;
    width: 90%;
    padding: 80px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`

const LogoOne = styled.img`

`

const SignUp = styled.a`
    width: 100%;
    background-color: #0063e5;
    font-weight: bold;
    font-size: 18px;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 250ms;
    margin-top: 8px;
    margin-bottom: 12px;

    &:hover {
        background: #0483ee;
    }
`

const Description = styled.p`
    font-size: 11px;
    letter-spacing: 1.5px;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 12px;
`

const LogoTwo = styled.img`
    width: 90%;
`