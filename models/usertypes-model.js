const model = {};

model.table = 'Usertypes';
model.fields = [
        'UsertypeID',
        'UsertypeName',
    ];

model.buildCreateQuery = (req) => {
        // Initialisations---------------------
        const record = req.body;

        return `INSERT INTO ${model.table} SET 
        UsertypeName='${record['UsertypeName']}'
        `;
    };

model.buildReadQuery = (req, variant) => {
    // Initialisation ----------------------

    let table = model.table; //name of table
    let fields = model.fields;
    // Resolve Foreign Keys -----------------

    // Build and return query --------------
    let where = '';
    const id = parseInt(req.params.id);

    switch(variant) {
        case 'primary':
            where = `WHERE UsertypeID=${id}`;
        break;

    }

   return `SELECT ${fields} FROM ${table} ${where}`;

};

export default model;