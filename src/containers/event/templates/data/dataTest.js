import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../components/ui-elements/atoms/Button';
import TextBlock from '../components/ui-elements/atoms/Text';
import ImageBlock from '../components/ui-elements/atoms/Image';
import DropdownBlock from '../components/ui-elements/atoms/DropDown';
import TableBlock from '../components/ui-elements/atoms/Table';
import DividerBlock from '../components/ui-elements/atoms/Devider'
import StepBlock from '../components/ui-elements/atoms/Step';
import TimepickersBlock from '../components/ui-elements/atoms/Timepicker';
import DatepickersBlocks from '../components/ui-elements/atoms/Datepicker';
import IconBlock from '../components/ui-elements/atoms/Icon';
import DividersBlock from '../components/ui-elements/atoms/Divider';


import HeaderBlock from '../components/ui-elements/blocks/Header';
import CountDownBlock from '../components/ui-elements/blocks/countdown/Countdown'
import Photos from '../components/ui-elements/blocks/photos/Photos';

import ContactUs1 from '../components/ui-elements/blocks/contactUs/ContactUs1';
import ContactUs2 from '../components/ui-elements/blocks/contactUs/ContactUs2';

import Banner1 from '../components/ui-elements/blocks/banner/Banner1';
import Banner2 from '../components/ui-elements/blocks/banner/Banner2'
import Banner3 from '../components/ui-elements/blocks/banner/Banner3'

import EventDescription1 from '../components/ui-elements/blocks/eventDescription/EventDescription1'
import EventDescription2 from '../components/ui-elements/blocks/eventDescription/EventDescription2'
import EventDescription3 from '../components/ui-elements/blocks/eventDescription/EventDescription3'

import TrashBlock from '../components/ui-elements/atoms/Trash';


export default
    [
        {
            name: 'Simple Block',
            value: [
                {
                    child: "Button",
                    options: ({ key }) => <ButtonBlock key={key} />,
                },
                {
                    child: "Text",
                    options: ({ key }) => <TextBlock
                        key={key}
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
                    options: ({ key }) => <TableBlock key={key} />,

                },
                {
                    child: "Dropdown",
                    options: ({ key }) => <DropdownBlock key={key} />,

                },
                {
                    child: "Divider",
                    options: ({ key }) => <DividerBlock key={key} />,

                },
                {
                    child: "DatePicker",
                    options: ({ key }) => <DatepickersBlocks key={key} />,

                },
                {
                    child: "TimePicker",
                    options: ({ key }) => <TimepickersBlock key={key} />,

                },
                {
                    child: "Step",
                    options: ({ key }) => <StepBlock key={key} />,

                },
                {
                    child: "Icon",
                    options: ({ key }) => <IconBlock key={key} />,

                },
                {
                    child: "Dividers",
                    options: ({ key }) => <DividersBlock key={key} />
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
                    options: ({ key }) => <HeaderBlock key={key} />

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
                    options: ({ key }) => <Banner1 key={key} />
                }
                , {
                    child: "Basic Banner",
                    options: ({ key }) => <Banner2 key={key} />
                }, {
                    child: "Medium Banner",
                    options: ({ key }) => <Banner3 key={key} />
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
                    options: ({ key }) => <EventDescription1 key={key} />
                },
                { child: "Option 2", options: ({ key }) => <EventDescription2 key={key} /> },
                { child: "Option 3", options: ({ key }) => <EventDescription3 key={key} /> }]
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
            value: [].map(({ child, options }) => {
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
                child: "Option 1",
                options: ({ key }) => <ButtonBlock key={key} />
            }, {
                child: "Option 2",
                options: ({ key }) => <ButtonBlock key={key} />
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
            name: 'Map/Location/Adress',
            value: [{
                child: "Option 1",
                options: ({ key }) => <ButtonBlock key={key} />
            }, {
                child: "Option 2",
                options: ({ key }) => <ButtonBlock key={key} />
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
            name: 'Coundown',
            value: [{
                child: "Option 1",
                options: ({ key }) => <CountDownBlock key={key} startCount="2021-04-20 12:07:00" />
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
            name: 'Photo/Image',
            value: [{
                child: "Option 1",
                options: ({ key }) => <ImageBlock key={key} />
            }, {
                child: "Option 2",
                options: ({ key }) => <Photos key={key} />
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
            name: 'Video',
            value: [{
                child: "Option 1",
                options: ({ key }) => <ButtonBlock key={key} />
            }, {
                child: "Option 2",
                options: ({ key }) => <ButtonBlock key={key} />
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
            name: 'Sponsors/Partners',
            value: [{
                child: "Option 1",
                options: ({ key }) => <ButtonBlock key={key} />
            }, {
                child: "Option 2",
                options: ({ key }) => <ButtonBlock key={key} />
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
                options: ({ key }) => <ContactUs1 key={key} />
            },
            {
                child: "Option 2",
                options: ({ key }) => <ContactUs2 key={key} />
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
            value: [].map(({ id, child, options }) => {
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
        }

    ]



