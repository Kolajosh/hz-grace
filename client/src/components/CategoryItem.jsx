import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 7px;
  height: 100vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
`;

const Title = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  border: none;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  color: gray;
  cursor: pointer;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>VIEW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
