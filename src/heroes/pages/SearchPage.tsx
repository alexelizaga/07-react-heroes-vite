import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks';
import { getHeroesByName } from '../helpers/getHeroesByName';
import { HeroCard } from '../components';


export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );
  const searchTerm: string = typeof(q) === 'string' ? q : ''; // Typescript shit

  const { searchText, onChange } = useForm({
    searchText: searchTerm
  });

  const heroes = getHeroesByName(searchTerm);

  const showSearch = (searchTerm.length === 0);
  const showError = (searchTerm.length > 0) && (heroes.length === 0);

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText.toLowerCase().trim() }`)
  }
  
  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ ({ target }) => onChange(target.value, 'searchText') }
            />
            <button className="btn btn-outline-primary">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div
            aria-label="alert-danger"
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{ searchTerm }</b>
          </div>

          {
            heroes?.map( hero => (
              <HeroCard key={ hero.id }  { ...hero } />
            ))
          }

        </div>
      </div>
        
    </>
  )
}