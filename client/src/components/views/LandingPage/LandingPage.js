// import { response } from 'express';
import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';


function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    
    //첫번째 페이지 20개 가져오는 부분
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)

  }, [])

  const fetchMovies = (endpoint) => {
    //영화들 불러오는 함수

    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log(response.results)
      //가져온 영화 API값을 state에 넣기
      //setMovies 할 때 원래 있던 값에 더보기하면 추가로 넣어질 수 있게
      setMovies([...Movies, ...response.results])
      setMainMovieImage(response.results[0])
      setCurrentPage(response.page)

    })

  }

  const loadMoreItems = () => {
    //더보기 클릭시 영화 불러오는 함수

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1} `;
    fetchMovies(endpoint)

  }


  return (

    <div style={{ width: '100%', margin: '0' }}>

      {/*main image*/}      
      { MainMovieImage && /*가져온게 있으면*/
        <MainImage 
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      }
      
      <div style={{ width: '85%', margin: '1rem auto' }}>        
        <h2> 최신 영화 </h2>
        <hr />
        {/*Movie grid cards */}

        <Row gutter={[16, 16]} >
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards
                image={movie.poster_path ?
                  `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                movieID={movie.id}
                movieName={movie.original_title}
              />

            </React.Fragment>
          ))}
        </Row>


      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreItems}> 더보기 </button>
      </div>
    </div>
  )
}


export default LandingPage