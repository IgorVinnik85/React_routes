import { Grid, GridItem } from 'components';
import { useLocation, Link } from 'react-router-dom';

export const CountryList = ({ countries }) => {
  const location = useLocation();

  return (
    <Grid>
      {countries.map(({ id, flag, country }) => {
        return (
          <GridItem key={id}>
            <Link to={`/country/${id}`} state={{ from: location }}>
              <img src={flag} alt={country} />
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
};
