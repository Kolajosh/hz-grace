import { Badge } from "@material-ui/core";
import "./Navbar.css";
import {
  Search,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
  ExitToAppSharp,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: 600;
  font-family: "Roboto";
  font-size: 24px;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  link
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const disapatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);

  const handleClick = (e) => {
    e.preventDefault();
    logout(disapatch);
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            {/* <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
          </Left>
          <Center>
            <Logo>HAZEL GRACE</Logo>
          </Center>
          <Right>
            <div className="dropdown">
              <button className="dropbtn">
                <PersonOutlineOutlined />
              </button>
              <div className="dropdown-content">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </div>
            </div>
            {/* <Link to="/register" style={{ textDecoration: "none" }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link> */}

            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <Link to="/cart">
                  <ShoppingCartOutlined />
                </Link>
              </Badge>
            </MenuItem>
            <button className="dropbtn" onClick={handleClick}>
              <ExitToAppSharp />
            </button>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
