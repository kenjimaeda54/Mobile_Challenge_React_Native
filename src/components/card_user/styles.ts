import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 20px 5px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

export const Img = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const ContainerTitles = styled.View`
  width: 70%;
  margin-left: 20px;
  justify-content: space-between;
`;

export const TitleName = styled.Text`
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.blueDark};
  font-family: ${({ theme }) => theme.fonts.interBold};
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.blueDark};
  font-family: ${({ theme }) => theme.fonts.interMedium};
`;

export const Footer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
`;

export const FooterDescription = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.blueDark};
  font-family: ${({ theme }) => theme.fonts.interRegular};
`;
