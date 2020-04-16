import React from 'react';

import ButtonBlock from '../components/ui-elements/Button';
import TextBlock from '../components/ui-elements/Text';
import ImageBlock from '../components/ui-elements/Image';
import DropdownBlock from '../components/ui-elements/DropDown';
import TableBlock from '../components/ui-elements/Table';
import DividerBlock from '../components/ui-elements/Devider'
import StepBlock from '../components/ui-elements/Step';
import TimepickersBlock from '../components/ui-elements/Timepicker';
import DatepickersBlocks from '../components/ui-elements/Datepicker';



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
        value: [{

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
        value: [{ child: "Only Image", options: ({ key }) => <ButtonBlock key={key} /> }
            , {
            child: "Basic Banner",
            options: ({ key }) => <ButtonBlock key={key} />
        }, {
            child: "Medium Banner",
            options: ({ key }) => <ButtonBlock key={key} />
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
        value: []
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



