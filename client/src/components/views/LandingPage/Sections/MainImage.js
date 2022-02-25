import React from "react"

//가장 유명한 영화 이미지를 main image로
//받아온 API에서의 첫번째 result

function MainImage(props) {
    return (
        <div style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(0,0,0,0.65)
        100%),
        url('${props.image}'), #1c1c1c`,
            height: '600px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'   
        }}>
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '3rem', marginLeft: '3rem' }}>
                    <h2 style={{ color: 'white', fontSize: '30px' }}> {props.title} </h2>
                    <p style={{ color: 'white', fontSize: '1rem' }}> {props.text} </p>
                </div>           
            </div>
        </div>
    )
}

export default MainImage