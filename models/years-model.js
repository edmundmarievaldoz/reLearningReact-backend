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
        YearName=:YearName
        `;
    };

model.buildReadQuery = (req, variant) => {
    // Initialisation ----------------------

    let table = model.table;
    let fields = model.fields;

    // Resolve Foreign Keys -----------------

    // Build and read query --------------
    let where = '';
    const id = parseInt(req.params.id);

    switch(variant) {
        case 'primary':
            where = `WHERE YearID=:ID`;
        break;

    }

    return `SELECT ${fields} FROM ${table} ${where}`;

};

model.buildUpdateQuery = (req) => {
        // Initialisations---------------------
        return `UPDATE ${model.table} SET 
        YearName=:YearName
        WHERE YearID=:ID
        `;
    };

export default model;