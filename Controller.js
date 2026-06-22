class Controller {
    constructor(buildReadQuery, database) {
        this.buildReadQuery = buildReadQuery;
        this.database = database;
    }

    // Method
    buildCreateQuery = (req) => {
        // Initialisations---------------------
        const record = req.body;

        let table = 'Modules'; //name of table
        let fields = [
            'ModuleID', 
            'ModuleCode', 
            'ModuleName', 
            'ModuleLevel', 
            'ModuleYearID', 
            'ModuleLeaderID', 
            'ModuleImageURL',
        ];

        return `INSERT INTO ${table} SET 
        ModuleCode='${record['ModuleCode']}',
        ModuleName='${record['ModuleName']}',
        ModuleLevel='${record['ModuleLevel']}',
        ModuleYearID='${record['ModuleYearID']}',
        ModuleLeaderID='${record['ModuleLeaderID']}',
        ModuleImageURL='${record['ModuleImageURL']}'
        `;
    };

    get = async (req, res, variant) => {
        // Initialisation ----------------------

       const sql = this.buildReadQuery(req, variant);

        try{
            const [result] = await this.database.query(sql);
            if(result.length === 0) res.status(404).json({message: 'No records(s) found...'});
            else res.status(200).json(result);

        }catch(error) {
            res.status(500).json({message: 'Failed to execute query: ${error.message}'});
        }
    };

    post = async (req, res) => {
        const sql = this.buildCreateQuery(req);
        try{
            const status = await this.database.query(sql);
            this.get({ params: {id: status[0].insertId}}, res, 'primary');
        }catch(error) {
            res.status(500).json({message: 'Failed to execute query: ${error.message}'});
        }
    };
}

export default Controller;