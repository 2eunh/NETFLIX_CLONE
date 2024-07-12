import styled from "styled-components";

export const FooterWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 100px;
  .row{
    margin-bottom: 30px;
    justify-content: space-between;
    display: flex;
    .col{
      border-bottom: 1px solid #fff;
      &:hover{
        cursor: pointer;
      }
    }
  }
`;