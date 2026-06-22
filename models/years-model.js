const model = {};

model.table = 'Years';
model.fields =[
        'YearID',
        'YearName',
    ];

model.buildCreateQuery = (req) => {
        // Initialisations---------------------
        const record = req.body;

        return `INSERT INTO ${model.table} SET 
        YearName='${record['YearName']}'
        `;
    };

const buildReadQuery = (req, variant) => {
    // Initialisation ----------------------

    let table = model.table;
    let fields = model.fields;

    // Resolve Foreign Keys -----------------

    // Build and read query --------------
    let where = '';
    const id = parseInt(req.params.id);

    switch(variant) {
        case 'primary':
            where = `WHERE YearID=${id}`;
        break;

    }

    return `SELECT ${fields} FROM ${table} ${where}`;

};

export default model;