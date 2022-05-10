import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
  padding-top: 30px;
`;

const Title = styled.h1`
  font-family: "Gibson";
  font-weight: 250;
  font-size: 20px;
`;

const Categories = () => {
  return (
    <>
      <TitleContainer>
        <Title>Categories</Title>
      </TitleContainer>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
