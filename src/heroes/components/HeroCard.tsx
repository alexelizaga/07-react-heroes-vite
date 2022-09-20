import { Link } from 'react-router-dom';

type Hero = {
    id?: string,
    superhero?: string,
    publisher?: string,
    alter_ego?: string,
    first_appearance?: string,
    characters?: string
}

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
}: Hero) => {

    const heroImageUrl: string = `/assets/heroes/${id}.jpg`;

    const CharactersByHero = ({ alter_ego, characters }: Hero ): JSX.Element => (
        ( alter_ego === characters )
            ? (<></>)
            : ( <p>{ characters }</p> )
    )

    return (
        <div className="col">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={ heroImageUrl } className="card-img" alt={ superhero } />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{ superhero }</h5>
                            <div className="card-text">{ alter_ego}</div>
                            <CharactersByHero alter_ego={alter_ego} characters={characters} />
                            <p className="card-text">
                                <small className="text-muted">{ first_appearance }</small>
                            </p>

                            <Link to={`/hero/${ id }`}>
                                Más...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
