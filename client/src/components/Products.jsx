import { ContactSupportOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
  padding-top: 30px;
`;

const Title = styled.h1``;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
  }, [sort]);

  return (
    <>
      <TitleContainer>
        <Title>Shop</Title>
      </TitleContainer>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item._id} />)}
      </Container>
    </>
  );
};

export default Products;
