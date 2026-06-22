const model = {};

model.table = 'Usertypes';
model.fields = [
        'UsertypeID',
        'UsertypeName',
    ];

model.buildCreateQuery = (req) => {
        // Initialisations---------------------

        return `INSERT INTO ${model.table} SET 
        UsertypeName=:UsertypeName
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
            where = `WHERE UsertypeID=:ID`;
        break;

    }

   return `SELECT ${fields} FROM ${table} ${where}`;

};

export default model;