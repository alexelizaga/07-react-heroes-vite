import { Navigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';

export const HeroPage = () => {

  const { id, ...rest } = useParams();

  const hero = getHeroById( id );

  console.log( hero );

  if (!hero ) {
    return <Navigate to='/' />
  }

  return (
    <>
        <h1>{ hero?.superhero }</h1>
    </>
  )
}