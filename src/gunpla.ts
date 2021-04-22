import express, { Request, Response } from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use(cors())

const dbc = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'eunhye',
	database: 'gunpladb'
})

app.listen('3000', () => {
	dbc.connect();
	console.log('Server Started')
})

app.get('/', (req: Request, res: Response) => {
	const query: string = 'select * from mechanic';
	dbc.query(query, (err, rows) => {
		if (err) return console.log(err);
		res.send(rows);
	})
});

app.get('/select_id', (req: Request, res: Response) => {
	const query: string = `select * from mechanic where id = ?`;
	dbc.query(query, [req.query.id], (err, rows) => {
		if (err) return console.log(err);
		res.send(rows);
	})
});

app.get('/gunpla/:id', (req: Request, res: Response) => {
	const query: string = "select * from gunpla where id = ?";
	dbc.query(query, [ req.params.id ], (err, rows) => {
		if (err) return console.log(err);
		res.send(rows);
	})
});

import bodyParser from "body-parser"
app.use(bodyParser.json())

//-------------------------

app.post('/mechanic/', (req: Request, res: Response) => {
	const query: string = "insert into mechanic values (?)";
	const mechanic = [
		req.body.id,
		req.body.name,
		req.body.model,
		req.body.manufacturer,
		req.body.armor,
		req.body.height,
		req.body.weight
	]
	dbc.query(query, [ mechanic ], (err, rows) => {
		if (err) throw err;
		res.json({
		  status: 200,
		  message: "Success: Add new mechanic"
		})
	})
})
