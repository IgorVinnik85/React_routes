import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    if (!search) return
    setLoading(true);
    const regionCountries = async () => {
      try {
        const data = await fetchByRegion(search);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    regionCountries();
  }, [search]);

  console.log('search :>> ', search);
  return (
    <Section>
      <Container>
        {error && <Heading>Something go's wrong {error} </Heading>}
        {loading && <Loader />}
        <SearchForm queary={setSearch} />
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
