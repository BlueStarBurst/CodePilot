import {
	Box,
	Button,
	Modal,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { logOut } from "./Auth";
import BugReport, { CreateBugReportModal } from "./BugReport";
import DBManager from "./DBManager";

export default function Dashboard(props) {
	const [open, setOpen] = useState(false);
	const [rows, setRows] = useState(0);

	const [todo, setTodo] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [completed, setCompleted] = useState([]);

	const [sortMethod, setSortMethod] = useState(0);
	const handleSortByPriority = (method) => {
		setSortMethod(method);
	  };
	  


	function handleClose() {
		setOpen(false);
		refresh();
	}

	useEffect(() => {
		refresh();
	}, []);

	function refresh() {
		var reportList = DBManager.instance.getBugReports();
		setTodo(reportList[1]);
		setInProgress(reportList[2]);
		setCompleted(reportList[3]);

		setRows(
			Math.max(reportList[1].length, reportList[2].length, reportList[3].length)
		);
		var rowList = [...Array(rows)].map((row, i) => i);
		console.log(rowList);
	}

	return (
		<>
			<h1>Dashboard</h1>
			<Button
				variant="contained"
				onClick={() => {
					setOpen(true);
				}}
			>
				Create Report
			</Button>

			<CreateBugReportModal open={open} handleClose={handleClose} />

			<Button variant="contained" onClick={() => handleSortByPriority(2)}>
  				Sort by Priority (Low to High)
			</Button>
			<Button variant="contained" onClick={() => handleSortByPriority(3)}>
  				Sort by Priority (High to Low)
			</Button>


			<TableContainer component={Paper} className="bugTable">
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>To-Do</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
  						{todo
    						.sort((a, b) => {
      						if (sortMethod === 2) {
        						return a.priority - b.priority;
      						} else if (sortMethod === 3) {
        						return b.priority - a.priority;
      						} else {
        						return 0;
      						}
    					})
    					.map((br, i) => (
      					  <BugReport bugRep={br} key={br.id} />
    					))}
					</TableBody>

				</Table>
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>In Progress</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{inProgress.map((br, i) => (
							<BugReport bugRep={br} />
						))}
					</TableBody>
				</Table>
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>Done</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{completed.map((br, i) => (
							<BugReport bugRep={br} />
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Button
				variant="contained"
				color="error"
				onClick={logOut}
				disabled={false}
			>
				Sign out
			</Button>
		</>
	);
}
