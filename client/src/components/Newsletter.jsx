import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #400909;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`;
const Title = styled.h1`
  font-family: "Gibson";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-family: "Gibson";
  font-style: normal;
  font-weight: 250;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  ${mobile({ textAlign: "center" })};
`;

const InputContainer = styled.div`
  width: 350px;
  height: 40px;
  border-radius: 12px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border-radius: 12px;
  font-family: "Gibson";
  font-style: normal;
  font-weight: 250;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  font-family: "Gibson";
  font-style: normal;
  font-weight: 250;
  border-radius: 12px;
  height: 40px
  color: black;
  padding: 10px
`;

const Nwsection = styled.div`
  display: flex;
  gap: 20px;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Sign Up</Title>
      <Desc>
        DISCOVER EXCLUSIVE NEW COLLECTIONS
        <br />
        AND STAY UPDATED
      </Desc>
      <Nwsection>
        <InputContainer>
          <Input placeholder="Enter email" />
        </InputContainer>
        <Button>Subscribe</Button>
      </Nwsection>
    </Container>
  );
};

export default Newsletter;
