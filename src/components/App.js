import styled from "styled-components";

import HamburgerMenu from "./HamburgerMenu";

export default function App() {
  return (
    <AppContainer>
      <HamburgerMenu size={100} strokeWidth={10} />
      <Label>click me!</Label>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const Label = styled.label`
  font-size: 1.5rem;
`;
