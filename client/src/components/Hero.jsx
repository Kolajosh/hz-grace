import { hero } from "../data";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  position: relative;
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
  object-fit: cover;
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  color: white;
  font-family: "Gibson";
  font-style: normal;
  font-weight: 700;
`;

const Desc = styled.p`
  font-family: "Gibson";
  font-style: normal;
  margin: 20px 0px;
  font-size: 20px;
  font-weight: 250;
  letter-spacing: 1px;
  color: white;
`;

const Hero = () => {
  return (
    <Container>
      <ImgContainer>
        {hero.map((item, index) => (
          <Image src={item.img} key={index} />
        ))}
        <InfoContainer>
          <Title>Upgrade your wardrobes!!</Title>
          <Desc>Lorem ipsum dolor sit amet, consectetur adipisicing</Desc>
        </InfoContainer>
      </ImgContainer>
    </Container>
  );
};

export default Hero;
