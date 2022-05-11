import { Add, Remove } from "@material-ui/icons";
import "./Cart.css";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  font-family: Merriweather, sans-serif;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  const user = useSelector((state) => state.user.currentUser);
  const TOKEN = user.accessToken;
  const PPSKEY = process.env.REACT_APP_PS_SEC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: cart.total * 100,
    publicKey: "pk_test_a2a07f271168742b7b3701435e96d81ef14ce8b3",
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className="paystack-button"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Checkout
        </button>
      </div>
    );
  };

  // you can call this function anything
  const onSuccess = (data) => {
    axios
      .get(`https://api.paystack.co/transaction/verify/${data.reference}`, {
        headers: {
          Authorization: `Bearer ${PPSKEY}`,
          // Authorization: `Bearer ${user.accessToken}`
        },
      })
      .then((response) => {
        const paymentData = {
          userId: user._id,
          data: response.data.data,
          reference: data.reference,
          message: data.message,
          status: data.status,
          transaction: data.transaction,
          cart: cart,
        };
        axios
          .post("http://localhost:5000/api/payment/", paymentData, {
            headers: {
              token: `Bearer ${TOKEN}`,
              "Content-type": "application/json",
              // Authorization: `Bearer ${user.accessToken}`
            },
          })
          .then((response) => {
            if (response.data) {
              alert("Payment done successfully");
            } else {
              alert("Error making purchase");
            }
          });
      });
  };

  // you can call this function anything
  const onClose = (response) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log(response);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts></TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>

            <PaystackHookExample />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
