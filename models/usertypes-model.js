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

model.buildUpdateQuery = (req) => {
        // Initialisations---------------------

        return `UPDATE ${model.table} SET 
        UsertypeName=:UsertypeName
        WHERE UsertypeID=:ID
        `;
    };

model.buildDeleteQuery = (req) => {
    // Initialisations---------------------
    return `DELETE FROM ${model.table} WHERE UsertypeID=:ID`;
};

export default model;