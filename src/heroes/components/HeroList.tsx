import { getHeroesByPublisher } from '../helpers';

type HeroListProps = {
    publisher: string
}

export const HeroList = ({ publisher }: HeroListProps) => {

    const heroes = getHeroesByPublisher(publisher);

    return (
        <ul>
            { 
                heroes.map( hero => (
                    <li key={ hero.id }>{hero.superhero}</li>)
                )
            }
        </ul>
        
    )
}
