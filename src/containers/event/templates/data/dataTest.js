import React from 'react';

import ButtonBlock from '../components/ui-elements/atoms/Button';
import TextBlock from '../components/ui-elements/atoms/Text';
import ImageBlock from '../components/ui-elements/atoms/Image';
import DropdownBlock from '../components/ui-elements/atoms/DropDown';
import TableBlock from '../components/ui-elements/atoms/Table';
import DividerBlock from '../components/ui-elements/atoms/Devider'
import StepBlock from '../components/ui-elements/atoms/Step';
import TimepickersBlock from '../components/ui-elements/atoms/Timepicker';
import DatepickersBlocks from '../components/ui-elements/atoms/Datepicker';

import HeaderBlock from '../components/ui-elements/blocks/Header';
import Banner1 from '../components/ui-elements/blocks/banner/Banner1';
import Banner2 from '../components/ui-elements/blocks/banner/Banner2'
import Banner3 from '../components/ui-elements/blocks/banner/Banner3'
import CountDownBlock from '../components/ui-elements/blocks/countdown/Countdown'



export default
    [{
        name: 'Simple Block',
        value: [
            {
                child: "Button",
                options: ({ key }) => <ButtonBlock key={key} />

            },
            {
                child: "Text",
                options: ({ key }) => <TextBlock
                    key={key}
                />
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
                child: "Image",
                options: ({ key }) => <ImageBlock
                    key={key}
                />,
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
        ]
    },

    {
        name: 'Basic',
        value: [
            {

                child: "Header",
                options: ({ key }) => <HeaderBlock key={key} />

            }, {

                child: "Normal Text",
                options: ({ key }) => <ButtonBlock key={key} />

            }, {
                child: "Text With Title",
                options: ({ key }) => <ButtonBlock key={key} />
            }, {
                child: "Two Column Text",
                options: ({ key }) => <ButtonBlock key={key} />
            }
        ]
    },
    {
        name: 'Banner',
        value: [{ child: "Only Image", options: ({ key }) => <Banner1 key={key} /> }
            , {
            child: "Basic Banner",
            options: ({ key }) => <Banner2 key={key} />
        }, {
            child: "Medium Banner",
            options: ({ key }) => <Banner3 key={key} />
        }]
    },
    {
        name: 'Event Description',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, { child: "Option 2", options: ({ key }) => <ButtonBlock key={key} /> }, { child: "Option 3", options: ({ key }) => <ButtonBlock key={key} /> }]
    },
    {
        name: 'Speaker/Performer/Team',
        value: []
    },
    {
        name: 'Schedule/Program/Step',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },]
    },
    {
        name: 'Map/Location/Adress',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },]
    },
    {
        name: 'Coundown',
        value: [{
            child: "Option 1",
            options: ({ key }) => <CountDownBlock key={key} startCount="2021-01-01" />
        }]
    },
    {
        name: 'Photo/Image',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },]
    },
    {
        name: 'Video',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },]
    },
    {
        name: 'Sponsors/Partners',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },]
    },
    {
        name: 'Contact Us',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        },
        {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },
        {
            child: "Option 3",
            options: ({ key }) => <ButtonBlock key={key} />
        },
        ]
    },
    {
        name: 'Navigation Menu',
        value: [{
            child: "Option 1",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Option 2",
            options: ({ key }) => <ButtonBlock key={key} />
        },

        {
            child: "Option 3",
            options: ({ key }) => <ButtonBlock key={key} />
        },
        ]
    },
    {
        name: 'Footer',
        value: []
    },
    {
        name: 'Social',
        value: []
    }

    ]



