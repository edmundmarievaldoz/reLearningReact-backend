const buildReadQuery = (req, variant) => {
    // Initialisation ----------------------

    let table = 'Years'; //name of table
    let fields = [
        'YearID',
        'YearName',
    ];

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

export default buildReadQuery;