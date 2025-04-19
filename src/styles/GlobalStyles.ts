import styled from "styled-components/native";
import { theme } from "./theme";

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
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
  padding: 15px 10px;

  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-weight: bold;
`;

export const buttonBack = {
  backgroundColor: "#94a3b8",
};
