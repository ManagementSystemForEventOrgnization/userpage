import React, { Component } from 'react'
import {

    FacebookOutlined,
    SkypeOutlined,
    YoutubeOutlined,
    InstagramOutlined,

}from '@ant-design/icons'
const SocialState = (props) => ({
    visible: false,
    IconSocials: [
        {
            id: 1,
            name: "facebook",
            pathLink: "https://www.facebook.com/",

            options: (pathLink) => (
                <a href={pathLink}>
                    <FacebookOutlined className="fa-facebook social-network-icon" />
                </a>
            ),

        },
        {
            id: 2,
            pathLink: "https://web.skype.com/",
            name: "skype",
            options: () => (
                <a>
                    <SkypeOutlined className="fa-twitter social-network-icon" />
                </a>
            ),

        },
        {
            id: 3,
            pathLink: "https://www.youtube.com/",
            name: "youtube",
            options: () => (
                <a >

                    <YoutubeOutlined className="fa-google social-network-icon" />

                </a>
            ),

        },
        {
            id: 4,
            pathLink: "https://www.instagram.com/",
            name: "intergram",
            options: () => (
                <a>
                    <InstagramOutlined className="fa-instagram social-network-icon" />
                </a>
            ),

        }
    ]


  




})

export { SocialState }
