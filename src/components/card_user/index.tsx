import React, { memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { formatDate, Results, getSex, getCountry } from '../../utils/dto';
import {
  Container,
  Img,
  ContainerTitles,
  TitleName,
  SubTitle,
  Description,
  Footer,
  FooterDescription,
  DescriptionColor,
  Gap,
} from './styles';

interface CardProps extends TouchableOpacityProps {
  result: Results;
}

export const CardUser = ({ result, ...rest }: CardProps): JSX.Element => (
  <TouchableOpacity {...rest} activeOpacity={0.7}>
    <Container>
      <Img
        source={{ uri: result.picture.medium }}
        resizeMethod="resize"
        resizeMode="contain"
      />
      <ContainerTitles>
        <TitleName>{result.name.first}</TitleName>
        <Gap />
        <SubTitle>{result.email}</SubTitle>
        <Gap />
        <Description>
          País: <DescriptionColor> {getCountry(result.nat)}</DescriptionColor>
        </Description>
        <Gap />
        <Description>
          Endereço:{' '}
          <DescriptionColor>
            {result.location.street.number},{result.location.street.name},
            {result.location.city},{result.location.state}
          </DescriptionColor>
        </Description>
        <Gap />
        <Description>
          Telefone: <DescriptionColor>{result.phone}</DescriptionColor>
        </Description>
        <Gap />
        <Description>
          Celular:
          <DescriptionColor> {result.cell}</DescriptionColor>
        </Description>
        <Gap />
        <Footer>
          <FooterDescription>{getSex(result.gender)} </FooterDescription>
          <FooterDescription>{formatDate(result.dob.date)}</FooterDescription>
        </Footer>
      </ContainerTitles>
    </Container>
  </TouchableOpacity>
);

export default memo(CardUser);
