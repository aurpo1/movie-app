import React from 'react'
import { Col } from 'antd';

function GridCards(props) {
  return (
        /*가장 클 때 4장, 중간 3장, 작을 때 1장 col 보여줌 */
        <Col    lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${props.movieID}`}>
                    <img style={{ width: '100%', height: '360px'}}
                    src={props.image} alt={props.movieName}/>
                </a>
            </div>
        </Col>
    )
}

export default GridCards
