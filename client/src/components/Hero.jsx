import { hero } from "../data";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover

`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index:2;
  background: grey;
`;

const Title = styled.h1`
  font-size: 70px;
  text-align: center;
  color: white;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  color: white;
`;

  const Hero = () => {
    return (
    <Container>
            <ImgContainer>
            {hero.map((item, index) => (
              <Image src={item.img} key={index} />
              ))}
              </ImgContainer>
            <InfoContainer>
              <Title>Upgrade your wardrobes!!</Title>
              <Desc>Lorem ipsum dolor sit amet, consectetur adipisicing</Desc>
            </InfoContainer>
    </Container>
  );
};

export default Hero;
