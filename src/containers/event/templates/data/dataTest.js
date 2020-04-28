import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../components/ui-elements/atoms/Button';
import TextBlock from '../components/ui-elements/atoms/Text';
import ImageBlock from '../components/ui-elements/atoms/Image';
import DropdownBlock from '../components/ui-elements/atoms/DropDown';
import TableBlock from '../components/ui-elements/atoms/Table';
import StepBlock from '../components/ui-elements/atoms/Step';
import TimepickersBlock from '../components/ui-elements/atoms/Timepicker';
import DatepickersBlocks from '../components/ui-elements/atoms/Datepicker';
import IconBlock from '../components/ui-elements/atoms/Icon';
import DividerBlock from '../components/ui-elements/atoms/Divider';


import HeaderBlock from '../components/ui-elements/blocks/Header';
import CountDownBlock from '../components/ui-elements/blocks/countdown/Countdown';

import Photo from '../components/ui-elements/blocks/photos/Photo';
// import Photos from '../components/ui-elements/blocks/photos/Photos';


import ContactUs1 from '../components/ui-elements/blocks/contactUs/ContactUs1';
import ContactUs2 from '../components/ui-elements/blocks/contactUs/ContactUs2';

import Banner1 from '../components/ui-elements/blocks/banner/Banner1';
import Banner2 from '../components/ui-elements/blocks/banner/Banner2';
import Banner3 from '../components/ui-elements/blocks/banner/Banner3';

import EventDescription1 from '../components/ui-elements/blocks/eventDescription/EventDescription1'
import EventDescription2 from '../components/ui-elements/blocks/eventDescription/EventDescription2'
import EventDescription3 from '../components/ui-elements/blocks/eventDescription/EventDescription3'
import Schedule1 from '../components/ui-elements/blocks/Scheduel/Scheduel1';
import Schedule2 from '../components/ui-elements/blocks/Scheduel/Scheduel2';

import TrashBlock from '../components/ui-elements/atoms/Trash';

import CardBlock from '../components/ui-elements/blocks/cardSpeaker/card';

import Sponsor1Block from '../components/ui-elements/blocks/sponsor/sponsor1';

import Footer1 from '../components/ui-elements/blocks/footer/footer1';
import Footer2 from '../components/ui-elements/blocks/footer/footer2';

export default
    [
        {
            name: 'Simple Block',
            value: [
                {
                    child: "Button",
                    options: ({ key, editable }) => <ButtonBlock key={key} editable={editable} />,
                },
                {
                    child: "Text",
                    options: ({ key, editable }) => <TextBlock
                        key={key}
                        editable={editable}
                    />
                },
                {
                    child: "Image",
                    options: ({ key, editable }) => <ImageBlock
                        key={key}
                        editable={editable}
                    />,
                },
                {
                    child: "Table",
                    options: ({ key, editable }) => <TableBlock key={key} editable={editable} />,

                },
                {
                    child: "Dropdown",
                    options: ({ key, editable }) => <DropdownBlock key={key} editable={editable} />,

                },
                {
                    child: "Divider",
                    options: ({ key, editable }) => <DividerBlock key={key} editable={editable} />,

                },
                {
                    child: "DatePicker",
                    options: ({ key, editable }) => <DatepickersBlocks key={key} editable={editable} />,

                },
                {
                    child: "TimePicker",
                    options: ({ key, editable }) => <TimepickersBlock key={key} editable={editable} />,

                },
                {
                    child: "Icon",
                    options: ({ key, editable }) => <IconBlock key={key} editable={editable} />,

                }
            ]
                .map(({ child, options }) => {
                    return {
                        id: uuid(),
                        child,
                        options: options ? options : () => <></>,
                        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                    };
                })
        },

        {
            name: 'Header',
            value: [
                {

                    child: "Header",
                    options: ({ key, editable }) => <HeaderBlock key={key} editable={editable} />

                }
            ].map(({ child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                };
            })
        },

        {
            name: 'Banner',
            value: [
                {
                    child: "Only Image",
                    options: ({ key, editable }) => <Banner1 key={key} editable={editable} />
                }
                , {
                    child: "Basic Banner",
                    options: ({ key, editable }) => <Banner2 key={key} editable={editable} />
                }, {
                    child: "Medium Banner",
                    options: ({ key, editable }) => <Banner3 key={key} editable={editable} />
                }].map(({ child, options }) => {
                    return {
                        id: uuid(),
                        child,
                        options: options ? options : () => <></>,
                        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                    };
                })
        },

        {
            name: 'Event Description',
            value: [
                {
                    child: "Option 1",
                    options: ({ key, editable }) => <EventDescription1 key={key} editable={editable} />
                },
                { child: "Option 2", options: ({ key, editable }) => <EventDescription2 key={key} editable={editable} /> },
                { child: "Option 3", options: ({ key, editable }) => <EventDescription3 key={key} editable={editable} /> }]
                .map(({ child, options }) => {
                    return {
                        id: uuid(),
                        child,
                        options: options ? options : () => <></>,
                        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                    };
                })
        },
        {
            name: 'Speaker/Performer/Team',
            value: [
                {
                    child: "Option 1",
                    options: ({ key, editable }) => <CardBlock key={key} editable={editable} />
                }].map(({ child, options }) => {
                    return {
                        id: uuid(),
                        child,
                        options: options ? options : () => <></>,
                        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                    };
                })
        },

        {
            name: 'Schedule/Program/Step',
            value: [{
                child: "Schedule1",
                options: ({ key, editable }) => <Schedule1 key={key} editable={editable} />
            },
            {
                child: "Step",
                options: ({ key, editable }) => <StepBlock key={key} editable={editable} />,

            },
            {
                child: "Schedule2",
                options: ({ key, editable }) => <Schedule2 key={key} editable={editable} />
            },
            ].map(({ child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                };
            })
        },

        {
            name: 'Map/Location/Adress',
            value: [{
                child: "Option 1",
                options: ({ key, editable }) => <ButtonBlock key={key} editable={editable} />
            }, {
                child: "Option 2",
                options: ({ key, editable }) => <ButtonBlock key={key} editable={editable} />
            },].map(({ id, child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: <TrashBlock />,
                };
            })
        },
        {
            name: 'Coundown',
            value: [{
                child: "Coundown",
                options: ({ key, editable }) => <CountDownBlock key={key} editable={editable} startCount="2021-01-01 12:00:00" />
            }].map(({ id, child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: <TrashBlock />,
                };
            })
        },
        {
            name: 'Video',
            value: [{
                child: "Option 1",
                options: ({ key, editable }) => <ButtonBlock key={key} editable={editable} />
            }, {
                child: "Option 2",
                options: ({ key, editable }) => <ButtonBlock key={key} editable={editable} />
            },].map(({ id, child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: <TrashBlock />,
                };
            })
        },
        {
            name: 'Sponsors/Partners',
            value: [{
                child: "Option 1",
                options: ({ key, editable }) => <Sponsor1Block key={key} editable={editable} />
            }, {
                child: "Option 2",
                options: ({ key, editable }) => <Sponsor1Block key={key} editable={editable} />
            },].map(({ id, child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: <TrashBlock />,
                };
            })
        },
        {
            name: 'Photo/Image',
            value: [{
                child: "Option 1",
                options: ({ key, editable }) => <ImageBlock key={key} editable={editable} />
            }, {
                child: "Option 2",
                options: ({ key, editable }) => <Photo key={key} editable={editable} />
            },].map(({ child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                };
            })
        },
        {
            name: 'Contact Us',
            value: [{
                child: "Option 1",
                options: ({ key, editable }) => <ContactUs1 key={key} editable={editable} />
            },
            {
                child: "Option 2",
                options: ({ key, editable }) => <ContactUs2 key={key} editable={editable} />
            },

            ].map(({ child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                };
            })
        },
        {
            name: 'Footer',
            value: [{
                child: "Footer 1",
                options: ({ key, editable }) => <Footer1 key={key} editable={editable} />
            }, {
                child: "Footer 2",
                options: ({ key, editable }) => <Footer2 key={key} editable={editable} />
            }].map(({ id, child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                };
            })
        },
        {
            name: 'Social',
            value: [].map(({ child, options }) => {
                return {
                    id: uuid(),
                    child,
                    options: options ? options : () => <></>,
                    trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
                };
            })
        },

    ]



