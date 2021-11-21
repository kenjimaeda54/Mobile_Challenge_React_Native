import React from 'react';
import { Data } from '../../utils/dto';
import {
  Container,
  Img,
  ContainerTitles,
  TitleName,
  SubTitle,
  Footer,
  FooterDescription,
} from './styles';

interface CardProps {
  data: Data;
}

export default function CardUser({ data }: CardProps): JSX.Element {
  return (
    <Container>
      <Img source={{ uri: data.image }} />
      <ContainerTitles>
        <TitleName>{data.name}</TitleName>
        <SubTitle>{data.email}</SubTitle>
        <Footer>
          <FooterDescription>{data.genre} </FooterDescription>
          <FooterDescription>{data.born}</FooterDescription>
        </Footer>
      </ContainerTitles>
    </Container>
  );
}
