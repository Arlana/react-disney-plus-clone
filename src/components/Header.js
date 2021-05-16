import React, { useEffect } from 'react';
import styled from 'styled-components';
import { selectUserName, selectUserPhoto, setSignOut, setUserLogin } from "../features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../firebase';
import { useHistory } from 'react-router';

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.userURL,
                }))
                history.push("/")
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result);
            let user = result.user;

            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.userURL,
            }))
            history.push("/")
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push("/login")
        })
    }

    return (
        <Nav>
            <Logo src ="/images/logo.svg" />

            {!userName ? (
                <LoginContainer>
                    <Login onClick = {signIn}>Login</Login>
                </LoginContainer>
                ) :

                <>
                    <NavMenu>
                        <a href="">
                            <img src="/images/home-icon.svg" alt="" />
                            <span>HOME</span>
                        </a>
                        <a href="">
                            <img src="/images/search-icon.svg" alt="" />
                            <span>SEARCH</span>
                        </a>
                        <a href="">
                            <img src="/images/watchlist-icon.svg" alt="" />
                            <span>WATCHLIST</span>
                        </a>
                        <a href="">
                            <img src="/images/original-icon.svg" alt="" />
                            <span>ORIGINALS</span>
                        </a>
                        <a href="">
                            <img src="/images/movie-icon.svg" alt="" />
                            <span>MOVIES</span>
                        </a>
                        <a href="">
                            <img src="/images/series-icon.svg" alt="" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>

                    <UserImg onClick={signOut} src ="/images/selfy.jpg"/>
                </>
            }

        </Nav>
    )
}

export default Header

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const Nav = styled.nav`
    overflow-x: hidden;
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 25px;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        text-decoration: none;
        color: white;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                right: 0;
                left: 0;
                bottom: -6px;
                opacity: 0;
                transform: scaleX(0);
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            }
        }

        &:hover {
            span:after {
                opacity: 1;
                transform: scaleX(1);
            }
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`