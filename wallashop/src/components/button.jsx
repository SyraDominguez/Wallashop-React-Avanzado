import styled from "styled-components";

const accentColor = "rgb(79, 211, 211)";

const Button = styled.button`
  cursor: pointer;
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  background-color: ${(props) =>
    props.$variant === "primary" ? accentColor : "white"};

  border-color: ${accentColor};
  color: ${(props) => (props.$variant === "primary" ? "white" : accentColor)};
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  min-height: 15px;
  justify-content: center;
  min-witdh: 72px;
  outline-style: none;
  opacity: ${(props) => (props.disabled ? " 0.5 " : 1)};
  padding: 0 15px;
  pointer-event: ${(props) => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary" ? "white" : accentColor};
    color: ${(props) => (props.$variant === "primary" ? accentColor : "white")};
  }
`;

export default Button;
