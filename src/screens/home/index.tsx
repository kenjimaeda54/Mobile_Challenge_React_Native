import React, { useState, useCallback, Fragment, useRef } from 'react';
import { Pressable } from 'react-native';
import CardUser from '../../components/card_user';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import {
  Container,
  Section,
  IconInput,
  Input,
  Title,
  WrapInput,
  ContainerCard,
  ContainerModal,
  Close,
  HeaderTitle,
  DescriptionColor,
  ContainerSection,
  TitleContainer,
  Id,
  TitleEmail,
  Description,
  Footer,
  FooterTitle,
  Image,
  ContainerImgModal,
  Gap,
  FieldSelect,
  WrapSelect,
  Select,
  Option,
  Button,
  TextButton,
} from './styles';
import { FlatList, RefreshControl } from 'react-native';
import Separator from '../../components/separator';
import { useTheme } from 'styled-components';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

export default function HomeScreen(): JSX.Element {
  const { colors } = useTheme();
  const openRefModalUser = useRef<Modalize>(null);
  const openRefModalFilter = useRef<Modalize>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [idSelectGenre, setIdSelectGenre] = useState(0);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleModal = () => openRefModalUser.current?.open();

  const handleModalFilter = () => openRefModalFilter.current?.open();

  const handleSelect = (id: number) => setIdSelectGenre(id);

  const handleFilterGenre = () => console.log('oi');

  const user = [
    {
      id: 1,
      image: 'https://github.com/kenjimaeda54.png',
      name: 'Kenji',
      email: 'Kenji@gmail.com',
      born: '08/06',
      phone: 324343,
      nationality: 'Japao',
      address: 'perereia',
      genre: 'masculino',
    },
    {
      id: 2,
      image: 'https://github.com/kenjimaeda54.png',
      name: 'Kenji',
      email: 'Kenji@gmail.com',
      born: '08/06',
      phone: 324343,
      nationality: 'Japao',
      address: 'perereia',
      genre: 'masculino',
    },
    {
      id: 3,
      image: 'https://github.com/kenjimaeda54.png',
      name: 'Kenji',
      email: 'Kenji@gmail.com',
      born: '08/06',
      phone: 324343,
      nationality: 'Japao',
      address: 'perereia',
      genre: 'masculino',
    },
  ];

  return (
    <Fragment>
      <FlatList
        data={user}
        style={{
          backgroundColor: colors.blueThird,
        }}
        ListHeaderComponent={
          <Container>
            <Title>Lista de pacientes</Title>
            <Section>
              <WrapInput>
                <Input placeholder="pesquise por nacionalidade" />
                <IconInput>
                  <AntDesign name="solution1" size={18} color={colors.white} />
                </IconInput>
              </WrapInput>
              <Pressable
                onPressIn={() => setOpacity(0.7)}
                onPressOut={() => setOpacity(1)}
                onPress={handleModalFilter}
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                style={{
                  opacity: opacity,
                }}
              >
                <FontAwesome name="filter" size={18} color={colors.white} />
              </Pressable>
            </Section>
          </Container>
        }
        keyExtractor={(item) => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <RectButton onPress={handleModal}>
            <ContainerCard>
              <CardUser data={item} />
            </ContainerCard>
          </RectButton>
        )}
        ItemSeparatorComponent={() => (
          <ContainerCard>
            <Separator />
          </ContainerCard>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Modalize
        handleStyle={{
          display: 'none',
        }}
        adjustToContentHeight
        ref={openRefModalUser}
        handlePosition="inside"
        HeaderComponent={() => (
          <ContainerImgModal>
            <Image source={{ uri: 'https://github.com/kenjimaeda54.png' }} />
            <Close>
              <AntDesign name="close" size={20} color={colors.orangeSecond} />
            </Close>
          </ContainerImgModal>
        )}
      >
        <ContainerModal>
          <HeaderTitle>
            <TitleContainer>Ricardo</TitleContainer>
            <Id> dfs</Id>
          </HeaderTitle>
          <ContainerSection>
            <Gap />
            <TitleEmail>Kenji@gmail</TitleEmail>
            <Gap />
            <Description>
              Telefone:<DescriptionColor> 123232</DescriptionColor>
            </Description>
            <Gap />
            <Description>
              Nacionalidade:<DescriptionColor> Brasil</DescriptionColor>
            </Description>
            <Gap />
            <Description>
              Endereco:<DescriptionColor> Rua silviano brando</DescriptionColor>
            </Description>
            <Gap />
          </ContainerSection>
          <Footer>
            <FooterTitle>Masucilno</FooterTitle>
            <FooterTitle>08/2020</FooterTitle>
          </Footer>
        </ContainerModal>
      </Modalize>
      <Modalize
        ref={openRefModalFilter}
        handlePosition="inside"
        adjustToContentHeight
      >
        <ContainerModal>
          <Gap />
          <TitleContainer>Filtrar por genero</TitleContainer>
          <Gap />
          <FieldSelect>
            <WrapSelect>
              <BorderlessButton onPress={() => handleSelect(1)}>
                <Select select={idSelectGenre === 1} />
              </BorderlessButton>
              <Option>Masculino</Option>
            </WrapSelect>
            <Gap />
            <WrapSelect>
              <BorderlessButton onPress={() => handleSelect(2)}>
                <Select select={idSelectGenre === 2} />
              </BorderlessButton>
              <Option>Feminino</Option>
            </WrapSelect>
          </FieldSelect>
          <Gap />
          <Button
            canPress={idSelectGenre !== 0}
            onPress={handleFilterGenre}
            enabled={idSelectGenre !== 0}
          >
            <TextButton>Filtrar</TextButton>
          </Button>
        </ContainerModal>
      </Modalize>
    </Fragment>
  );
}
