import React, {useEffect, useState} from 'react';
import './App.css';
import MovieRow from "./MovieRow";
import $ from 'jquery'
import 'rsuite/dist/styles/rsuite-default.css';



function App() {

    const [searchResult, setSearchResult] = useState('')
    const [movie, setMovie] = useState([] as any);

    useEffect(() => {

        preformSearch(searchResult);


    }, [searchResult]);

    function preformSearch(searchTerm: string) {
        const urlString = 'https://api.themoviedb.org/3/search/movie?api_key=9b04c092ecca0cf3dbaa217c607ae4b4&query=' + searchTerm;
        $.ajax({
            url: urlString,
            success: (searchResult) => {
                const results = searchResult.results;

                const movieRows: ((prevState: never[]) => never[]) | JSX.Element[] = []

                results.forEach((movie: any) => {
                    movie.poster_src = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.backdrop_path
                    if(movie.backdrop_path === null){
                        movie.poster_src =  'https://php7.joblo.com/assets/images/movie-database/placeholder.jpg'
                    }
                    const movieRow = <MovieRow
                        id={movie.id}
                        title={movie.original_title}
                        img={movie.poster_src}
                        description={movie.overview}
                        vote={movie.vote_average}/>
                    movieRows.push(movieRow);
                })
                setMovie(movieRows)
            },
            error: (xhr, status, err) => {
                console.error('Failed to fetch data, setting default image: ', err);
                movie.poster_src = 'https://php7.joblo.com/assets/images/movie-database/placeholder.jpg';
            }
        })
    }


    return (
        <div className="App">
            <table className='titleBar'>
                <tbody>
                <tr>
                    <td>
                        <img src={'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'} alt={'app icon'} width={130}/>
                    </td>
                    <td width='8'/>
                    <td>
                        <h1>MovieDB Search</h1>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="container">
                <form autoComplete="off">
                    <div className="finder">
                        <div className="finder__outer">
                            <div className="finder__inner">
                                <input className="finder__input" type="text"
                                       style={{
                                           fontSize: 24,
                                           display: 'block',
                                           paddingTop: 8,
                                           paddingBottom: 8,
                                           paddingLeft: 16,
                                           width: '100%',
                                       }} placeholder={'Enter search term'}
                                       onChange={e => setSearchResult(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


                {movie}
        </div>
    );

}
export default App;
