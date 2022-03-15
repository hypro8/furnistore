import React from "react";
import styled from "styled-components";

const Testing = () => {
  return (
    <Wrapper>
      <h3>hello world</h3>
      <p>this is p</p>
      <button>click</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3 {
    background: pink;
    color: red;
  }
  button {
    color: red;
  }
`;

export default Testing;
