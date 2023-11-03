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
import BugReport, { CreateBugReportModal, FakeBugReport } from "./BugReport";
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

		setRows(
			Math.max(reportList[1].length, reportList[2].length, reportList[3].length)
		);
		var rowList = [...Array(rows)].map((row, i) => i);
		console.log(rowList);
	}

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const [mouseCol, setMouseCol] = useState(0);
	const [bugId, setBugId] = useState(0);

	function moveBR(col) {
		DBManager.instance.moveBugReport(bugId, col);
		console.log("moved to " + col + " " + bugId);
		refresh();
	}

	return (
		<>
			<br />
			<h1>Dashboard</h1>

			<CreateBugReportModal open={open} handleClose={handleClose} />

			<TableContainer component={Paper} className="bugTable">
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>To-Do</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{todo.map((br, i) => (
							<>
								<FakeBugReport
									col={0}
									mouseCol={mouseCol}
									dragging={dragging}
									mousePos={mousePos}
									moveBR={moveBR}
								/>
								<BugReport
									col={0}
									setMouseCol={setMouseCol}
									setDragging={setDragging}
									setMousePos={setMousePos}
									bugRep={br}
									setBugId={setBugId}
								/>
							</>
						))}
						<FakeBugReport
							col={0}
							mouseCol={mouseCol}
							dragging={dragging}
							mousePos={mousePos}
							moveBR={moveBR}
						/>
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
							<>
								<FakeBugReport
									col={1}
									mouseCol={mouseCol}
									dragging={dragging}
									mousePos={mousePos}
									moveBR={moveBR}
								/>
								<BugReport
									col={1}
									setMouseCol={setMouseCol}
									setDragging={setDragging}
									setMousePos={setMousePos}
									bugRep={br}
									setBugId={setBugId}
								/>
							</>
						))}
						<FakeBugReport
							col={1}
							mouseCol={mouseCol}
							dragging={dragging}
							mousePos={mousePos}
							moveBR={moveBR}
						/>
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
							<>
								<FakeBugReport
									col={2}
									mouseCol={mouseCol}
									dragging={dragging}
									mousePos={mousePos}
									moveBR={moveBR}
								/>
								<BugReport
									col={2}
									setMouseCol={setMouseCol}
									setDragging={setDragging}
									setMousePos={setMousePos}
									bugRep={br}
									setBugId={setBugId}
								/>
							</>
						))}
						<FakeBugReport
							col={2}
							mouseCol={mouseCol}
							dragging={dragging}
							mousePos={mousePos}
							moveBR={moveBR}
						/>
					</TableBody>
				</Table>
			</TableContainer>

			<div className="flex-row">
				<Button
					variant="contained"
					onClick={() => {
						setOpen(true);
					}}
				>
					Create Report
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={logOut}
					disabled={false}
				>
					Sign out
				</Button>
			</div>
			<br />
		</>
	);
}
