import styled from "styled-components/native";
import { theme } from "./theme";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${theme.colors.primary};
`;

export const Description = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: ${theme.colors.text};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.buttonBackground};
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;
