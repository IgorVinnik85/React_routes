import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const region = searchParams.get('query');
    if (!region) return;
    setLoading(true);
    const regionCountries = async () => {
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    regionCountries();
  }, [searchParams]);

  console.log('search :>> ', search);
  return (
    <Section>
      <Container>
        {error && <Heading>Something go's wrong {error} </Heading>}
        {loading && <Loader />}
        <SearchForm queary={setSearch} setSearchParams={setSearchParams} />
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
