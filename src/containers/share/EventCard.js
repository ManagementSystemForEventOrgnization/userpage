import React, { Component } from 'react'

export default class EventCard extends Component {
    render() {
        const urlImgCard = "https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg";

        return (
            <div className="ml-5 eventCard">
                <div className=" ml-4 movie_card" id="bright">
                    <div className="info_section">
                        <div className="movie_header">
                            <img className="locandina"  alt= "locandina" src={urlImgCard} />
                            <h1>Bright</h1>
                            <h4>2017, David Ayer</h4>
                            <span className="minutes">117 min</span>
                            <p className="type">Action, Crime, Fantasy</p>
                        </div>
                        <div className="movie_desc">
                            <p className="text">
                                Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for.
                 </p>
                        </div>
                        <div className="movie_social">
                            <ul>
                                <li><i className="material-icons">share</i></li>
                                <li><i className="material-icons"></i></li>
                                <li><i className="material-icons">chat_bubble</i></li>
                            </ul>
                        </div>
                    </div>
                    <div className="blur_back bright_back"></div>
                </div>

            </div>
        )
    }
}
