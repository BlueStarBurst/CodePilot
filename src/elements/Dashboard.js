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

		setRows(Math.max(reportList[1].length, reportList[2].length, reportList[3].length));
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

			<TableContainer component={Paper} className="bugTable">
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>To-Do</TableCell>
							<TableCell>In Progress</TableCell>
							<TableCell>Completed</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{[...Array(rows)].map((row, i) => (
							<TableRow key={i}>
								<TableCell>
									{i < todo.length ? <BugReport bugRep={todo[i]} /> : null}
								</TableCell>
								<TableCell>
									{i < inProgress.length ? (
										<BugReport bugRep={inProgress[i]} />
									) : null}
								</TableCell>
								<TableCell>
									{i < completed.length ? (
										<BugReport bugRep={completed[i]} />
									) : null}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>To-Do</TableCell>
							<TableCell>In Progress</TableCell>
							<TableCell>Completed</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{[...Array(rows)].map((row, i) => (
							<TableRow key={i}>
								<TableCell>
									{i < todo.length ? <BugReport bugRep={todo[i]} /> : null}
								</TableCell>
								<TableCell>
									{i < inProgress.length ? (
										<BugReport bugRep={inProgress[i]} />
									) : null}
								</TableCell>
								<TableCell>
									{i < completed.length ? (
										<BugReport bugRep={completed[i]} />
									) : null}
								</TableCell>
							</TableRow>
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
