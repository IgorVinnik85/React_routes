import { Section, Container, CountryInfo, Loader } from 'components';
import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { fetchCountry } from '../service/country-service';

export const Country = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { countryId } = useParams();

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const getCountry = async () => {
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, []);

  const { flag, capital, countryName, id, languages, population } = country;

  return (
    <Section>
      <Link to={ location.state??'/'} >Back</Link>

      <Container>
        <CountryInfo
          flag={flag}
          capital={capital}
          country={countryName}
          id={id}
          languages={languages}
          population={population}
        />
      </Container>
    </Section>
  );
};
