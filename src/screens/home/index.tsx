import React, {
  useState,
  useCallback,
  Fragment,
  useRef,
  useEffect,
} from 'react';
import {
  Pressable,
  ActivityIndicator,
  StatusBar,
  TextInput,
} from 'react-native';
import CardUser from '../../components/card_user';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import {
  getCountry,
  getSex,
  Results,
  formatDate,
  getInitialsCountry,
} from '../../utils/dto';
import {
  Container,
  ContainerLoading,
  Section,
  IconInput,
  Input,
  Title,
  WrapInput,
  ContainerModal,
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
  LoaderFooter,
  Error,
} from './styles';
import { FlatList } from 'react-native';
import Separator from '../../components/separator';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';
import api from '../../services';

interface UserSelectProps {
  id: string;
  name: string;
  email: string;
  image: string;
  nationality: string;
  phone: string;
  born: string;
  address: string;
  genre: string;
  cell: string;
}

export default function HomeScreen(): JSX.Element {
  const { colors } = useTheme();
  const openRefModalUser = useRef<Modalize>(null);
  const openRefModalFilter = useRef<Modalize>(null);
  const inputRef = useRef<TextInput>(null);
  const [country, setCountry] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [page, setPage] = useState(1);
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isWrong, setIsWrong] = useState(false);
  const [allUser, setAllUser] = useState<Results[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [idSelectGenre, setIdSelectGenre] = useState(0);
  const [generic, setGeneric] = useState('');
  const [userSelect, setUserSelect] = useState<UserSelectProps>(
    {} as UserSelectProps,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        let data: Results[] = [];
        if (filterCountry.length > 1) {
          const response = await api.get(
            `/?page=${page}&results=10&nat=${filterCountry}`,
          );
          data = response.data.results;
        } else if (generic.length < 2) {
          const response = await api.get(`/?page=${page}&results=10`, {
            maxContentLength: 10,
          });
          inputRef.current?.blur();
          data = response.data.results;
        } else {
          const response = await api.get(
            `/?page=${page}&results=10&gender=${generic}`,
          );
          data = response.data.results;
          inputRef.current?.blur();
        }
        if (allUser.length > 0) {
          setAllUser((previous) => [...previous, ...data]);
        } else {
          setAllUser(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setLoadingBatch(false);
      }
    }
    fetchData();
  }, [page, isLoading]);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const refreshControl = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function handleModalUser({
    id,
    name,
    email,
    image,
    nationality,
    phone,
    born,
    address,
    genre,
    cell,
  }: UserSelectProps) {
    const userSelect = {
      id,
      name,
      email,
      image,
      nationality,
      phone,
      born,
      address,
      genre,
      cell,
    };
    setUserSelect(userSelect);
    openRefModalUser.current?.open();
  }

  const handleModalFilter = () => openRefModalFilter.current?.open();

  const handleSelect = (id: number) => setIdSelectGenre(id);

  function handleFilterGenre() {
    setIsLoading(true);
    setFilterCountry('');
    setAllUser([]);
    openRefModalFilter.current?.close();
    if (idSelectGenre === 1) {
      setGeneric('male');
    } else {
      setGeneric('female');
    }
  }

  function handleBatch() {
    setLoadingBatch(true);
    if (allUser.length !== 50) {
      return setPage((previous) => previous + 1);
    }
  }

  function handleEvent() {
    setIsLoading(true);
    const initialCountry = getInitialsCountry(country);
    if (initialCountry === undefined || initialCountry.length < 2) {
      setIsLoading(false);
      return setIsWrong(true);
    }
    setIsWrong(false);
    setAllUser([]);
    return setFilterCountry(initialCountry);
  }
  return (
    <Fragment>
      <StatusBar />
      {isLoading ? (
        <ContainerLoading>
          <ActivityIndicator size="large" color={colors.orange} />
        </ContainerLoading>
      ) : (
        <Container>
          <Title>Lista de pacientes</Title>
          {isWrong && (
            <Fragment>
              <Error>Você digitou um, país invalido.</Error>
              <Error>Exemplo de países validos: Brazil,Austria</Error>
            </Fragment>
          )}
          <Section>
            <WrapInput>
              <Input
                autoFocus
                ref={inputRef}
                onSubmitEditing={handleEvent}
                value={country}
                onChangeText={setCountry}
                placeholder="Austria"
                placeholderTextColor={colors.gray}
              />
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

          <FlatList
            data={allUser}
            style={{
              flexGrow: 1,
              marginTop: 30,
              height: '100%',
              backgroundColor: colors.blueThird,
            }}
            keyExtractor={(item) => item.login.uuid}
            onRefresh={() => refreshControl()}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            onEndReached={handleBatch}
            initialNumToRender={7}
            removeClippedSubviews
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loadingBatch && (
                <LoaderFooter>
                  <ActivityIndicator size="small" color={colors.orange} />
                </LoaderFooter>
              )
            }
            renderItem={({ item }) => (
              <CardUser
                onPress={() =>
                  handleModalUser({
                    id: `*** ${item.login.uuid[item.login.uuid.length - 1]} ${
                      item.login.uuid[item.login.uuid.length - 2]
                    } ${item.login.uuid[item.login.uuid.length - 3]}`,
                    image: item.picture.large,
                    name: `${item.name.title} ${item.name.first} ${item.name.last}`,
                    email: item.email,
                    born: item.dob.date,
                    phone: item.phone,
                    nationality: item.nat,
                    address: `${item.location.street.number},${item.location.street.name}, ${item.location.city}, ${item.location.state} `,
                    genre: item.gender,
                    cell: item.cell,
                  })
                }
                result={item}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
            contentContainerStyle={{ paddingBottom: 20, marginTop: 20 }}
          />
        </Container>
      )}

      <Modalize
        handleStyle={{
          display: 'none',
        }}
        adjustToContentHeight
        ref={openRefModalUser}
        handlePosition="inside"
        HeaderComponent={() => (
          <ContainerImgModal>
            <Image
              resizeMethod="resize"
              resizeMode="cover"
              source={{ uri: userSelect.image }}
            />
          </ContainerImgModal>
        )}
      >
        {allUser.length > 0 && (
          <ContainerModal>
            <HeaderTitle>
              <TitleContainer>{userSelect.name}</TitleContainer>
              <Id> {userSelect.id}</Id>
            </HeaderTitle>
            <ContainerSection>
              <Gap />
              <TitleEmail>{userSelect.email}</TitleEmail>
              <Gap />
              <Description>
                Telefone:
                <DescriptionColor> {userSelect.phone}</DescriptionColor>
              </Description>
              <Gap />
              <Description>
                Celular:<DescriptionColor> {userSelect.cell}</DescriptionColor>
              </Description>
              <Gap />
              <Description>
                País:
                <DescriptionColor>
                  {' '}
                  {getCountry(userSelect.nationality)}
                </DescriptionColor>
              </Description>
              <Gap />
              <Description>
                Endereço:
                <DescriptionColor> {userSelect.address}</DescriptionColor>
              </Description>
              <Gap />
            </ContainerSection>
            <Footer>
              <FooterTitle>{getSex(userSelect.genre)}</FooterTitle>
              <FooterTitle>
                {userSelect.born && formatDate(userSelect.born)}
              </FooterTitle>
            </Footer>
          </ContainerModal>
        )}
      </Modalize>
      <Modalize
        ref={openRefModalFilter}
        handlePosition="inside"
        adjustToContentHeight
      >
        <ContainerModal>
          <Gap />
          <TitleContainer>Filtrar por gênero</TitleContainer>
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
