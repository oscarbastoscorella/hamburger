import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useToggle from "./useToggle";
import { useSpring, animated, config } from "react-spring";

export default function HamburgerMenu({ size = 100, strokeWidth = 5 }) {
  const [isOpen, setIsOpen] = useToggle();

  const [containerHeight, setContainerHeight] = useState(0);
  const ref = useRef(null);

  const [{ opacity, rotate, y }, set] = useSpring(() => ({
    rotate: "0deg",
    y: "0px",
    opacity: 1,
    config: config.stiff,
  }));

  useEffect(() => {
    setContainerHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    isOpen
      ? set.start({
          rotate: "45deg",
          y: calculateLineOffsetY(containerHeight, strokeWidth),
          opacity: 0,
        })
      : set.start({ rotate: "0deg", y: "0px", opacity: 1 });
  }, [isOpen, containerHeight, strokeWidth, set]);

  function calculateLineOffsetY(height, lineHeight) {
    const lineOffsetY = height / 2 - lineHeight / 2;
    return `${lineOffsetY}px`;
  }

  return (
    <Container onClick={setIsOpen} size={size} stroke={strokeWidth}>
      <LineContainer ref={ref}>
        <Line
          background={`black`}
          style={{ rotate: rotate, y }}
          stroke={strokeWidth}
        />
        <Line background={`brown`} style={{ opacity }} stroke={strokeWidth} />
        <Line
          background={`black`}
          style={{
            rotate: rotate.to((rotate) => `-${rotate}`),
            y: y.to((y) => `-${y}`),
          }}
          stroke={strokeWidth}
        />
      </LineContainer>
    </Container>
  );
}
const Container = styled.div`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: 100%;
  border: ${(props) => props.stroke}px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LineContainer = styled.div`
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Line = styled(animated.div)`
  height: ${(props) => props.stroke}px;
  background: ${(props) => props.background};
  border-radius: 50px;
`;
