import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Dimensions } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface SelectProps {
  select: boolean;
}

interface ButtonProps {
  canPress: boolean;
}

export const Container = styled.View`
  flex: 1;
  height: 100%;
  padding: ${getStatusBarHeight() + 30}px 20px;
  width: ${Dimensions.get('window').width}px;
  background-color: ${({ theme }) => theme.colors.blueThird};
`;

export const Title = styled.Text`
  margin-bottom: 50px;
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.interBold};
`;

export const ContainerCard = styled.View`
  background-color: ${({ theme }) => theme.colors.blueThird};
  padding: 5px 20px;
`;

export const TextInput = styled.Text`
  font-family: ${({ theme }) => theme.fonts.interMedium};
`;

export const Section = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconInput = styled.View`
  position: absolute;
  left: 230px;
`;

export const Input = styled.TextInput`
  position: relative;
  padding: 10px 10px;
  width: 93%;
  background-color: ${({ theme }) => theme.colors.orangeSecond};
  border-radius: 4px;
  text-align: center;
  font-size: 15px;
  line-height: 17px;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.interRegular};
`;

export const WrapInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0px;
`;

export const ContainerRefresh = styled.View`
  justify-content: flex-end;
  align-items: center;
`;

export const ContainerModal = styled.View`
  padding: 20px;
`;

export const Close = styled.View`
  width: 100%;
  align-items: flex-end;
  padding: 10px 20px;
  margin-top: -50px;
`;

export const HeaderTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 20px 0px;
`;

export const TitleContainer = styled.Text`
  font-size: 18px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.orangeSecond};
  font-family: ${({ theme }) => theme.fonts.interBold};
  width: 80%;
`;

export const ContainerSection = styled.View`
  width: 80%;
`;

export const Id = styled.Text`
  font-size: 15px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.orangeSecond};
  font-family: ${({ theme }) => theme.fonts.interMedium};
  margin-bottom: 5px;
`;

export const TitleEmail = styled.Text`
  font-size: 17px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.orangeSecond};
  font-family: ${({ theme }) => theme.fonts.interMedium};
`;

export const Description = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.blueDark};
  font-family: ${({ theme }) => theme.fonts.interRegular};
`;

export const DescriptionColor = styled(Description)`
  color: ${({ theme }) => theme.colors.orangeSecond};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
`;

export const FooterTitle = styled(DescriptionColor)``;

export const ContainerImgModal = styled.View`
  width: 100%;
  margin-top: -30px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: -30px;
  justify-content: center;
  align-items: center;
`;

export const Gap = styled.View`
  margin: 4px 0px;
`;

export const FieldSelect = styled.View`
  width: 100%;
`;

export const WrapSelect = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Select = styled.View<SelectProps>`
  background-color: ${({ select, theme }) =>
    select ? theme.colors.orangeSecond : 'transparent'};
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.orangeSecond};
  width: 20px;
  height: 20px;
`;

export const Option = styled.Text`
  margin-left: 10px;
  font-size: 17px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.orangeSecond};
  font-family: ${({ theme }) => theme.fonts.interMedium};
`;

export const Button = styled(BorderlessButton)<ButtonProps>`
  width: 100%;
  padding: 13px 0px;
  border-radius: 4px;
  background-color: ${({ canPress, theme }) =>
    canPress ? theme.colors.blueThird : theme.colors.gray};
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 17px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.interRegular};
`;
