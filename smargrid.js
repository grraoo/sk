var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'scss',
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '15px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1200px', /* -> @media (max-width: 1200px) */
            'fields': '15px' /* side fields */
        },
        md: {
            'width': '960px', /* -> @media (max-width: 960px) */
            'fields': '15px' /* side fields */
        },
        sm: {
            'width': '768px', /* -> @media (max-width: 768px) */
            'fields': '15px' /* side fields */
        },
        xs: {
            'width': '600px', /* -> @media (max-width: 600px) */
            'fields': '15px' /* side fields */
        },
        xxs: {
            'width': '400px', /* -> @media (max-width: 400px) */
            'fields': '15px' /* side fields */
        }
        /*
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};

smartgrid('src/precss/lib', settings);
