// import React, { Component } from 'react'

// class Timer extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             count: 0,
//             day: 0,
//             hour: 0,
//             minute: 0,
//             second: 0
//         }
//     }

//     // componentDidMount() {
//     //     const { startCount } = this.props
//     //     //  const startCount = 1000
//     //     this.setState({
//     //         count: startCount
//     //     })
//     //     this.doIntervalChange()
//     // }

//     // doIntervalChange = () => {
//     //     this.myInterval = setInterval(() => {
//     //         if (this.state.count > 0) {
//     //             this.setState(prevState => ({
//     //                 count: prevState.count - 1
//     //             }))
//     //         }
//     //     }, 1000)
//     // }

//     // componentWillUnmount() {
//     //     clearInterval(this.myInterval)
//     // }

//      calculateTimeLeft = () => {
//         const difference = +new Date("2022-01-01") - +new Date();
//         let timeLeft = {};

//         if (difference > 0) {
//           timeLeft = {
//             days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//             hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//             minutes: Math.floor((difference / 1000 / 60) % 60),
//             seconds: Math.floor((difference / 1000) % 60)
//           };
//         }

//         return timeLeft;
//       };

//     render() {
//         const { count } = this.state;
//         const { key } = this.props;
//         return (
//             <div className="container" key={key}>
//                 <div className="row border border-primary mt-2">
//                     <div className="col">  <h1>{count}</h1> <h4>days</h4></div>
//                     <div className="col">col <h4>hours</h4></div>
//                     <div className="col">col<h4>minutes</h4></div>
//                     <div className="col">col<h4>seconds</h4></div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Timer


import React, { useEffect, useState } from "react";

function Timer(key, startCount) {
    const calculateTimeLeft = () => {
        startCount = "2021-01-01"
        const difference = +new Date(startCount) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <div className="col">
                <h2> {timeLeft[interval]}</h2>
                {interval}
            </div>
        );
    });

    return (
        <div className="container" key={key}>
            <div className="row border border-primary mt-2">
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </div>
        </div>

    );
}

export default Timer;