import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import db from '../firebase';

function Detail() {
    const { id } = useParams();
    // console.log("Movie specific id is",id);
    const [movie, setMovie] = useState(); // for indiv component (redux is global)

    useEffect(() => {
        //Get the movie info from DB = 
        db
            .collection("movies")
            .doc(id)
            .get()
            .then((doc) => {
                if(doc.exists) {
                    //save movie data = useState cause this detail pages changes for specific movie
                    setMovie(doc.data());
                    console.log(doc.data())
                } else {
                    // redirect to Home page
                }
            })
    }, [])
    return (
        <Container>
            {movie &&
            <>
                <Background>
                    <img src={movie.backgroundImg} />
                </Background>

                <ImageTitle>
                <img src={movie.titleImg} /> 
                </ImageTitle>

                <Controls>
                    <PlayBtn>
                        <img src="/images/play-icon-black.png" alt="" />
                        <span>PLAY</span>
                    </PlayBtn>

                    <TrailerBtn>
                    <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
                    </TrailerBtn>

                    <AddBtn>
                        <span>+</span>
                    </AddBtn>

                    <GroupWatchBtn>
                        <img src="/images/group-icon.png" alt="" />
                    </GroupWatchBtn>

                </Controls>
                
                <Subtitle>
                    {movie.subTitle}
                </Subtitle>

                <Description>
                    {movie.description}
                </Description>
            </>
            }
        </Container>
    )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`

const Background = styled.div`
    position: fixed;
    z-index: -1;
    opacity: 0.8;
    top: 0;
    left: 0; 
    right: 0;
    bottom: 0;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 60px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const PlayBtn = styled.button`
    border-radius: 4px;
    border: none;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    padding: 0 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background: rgb(198, 198, 198);
    }
`

const Controls = styled.div`
    display: flex;
    align-items: center;
`

const TrailerBtn = styled(PlayBtn)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
    text-transform: uppercase;
`

const AddBtn = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span {
        font-size: 30px;
        color: white;
    }
`

const GroupWatchBtn = styled(AddBtn)`
    background-color: rgba(0, 0, 0);
`

const Subtitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`