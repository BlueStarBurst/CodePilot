import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	InputLabel,
	MenuItem,
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
import BugReport, {
	BugReportData,
	CreateBugReportModal,
	FakeBugReport,
} from "./BugReport";
import DBManager from "./DBManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSortAlphaAsc,
	faSortAmountAsc,
	faSortAmountDesc,
	faSortAsc,
	faSortDesc,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard(props) {
	const [open, setOpen] = useState(false);
	const [rows, setRows] = useState(0);

	const [todo, setTodo] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [completed, setCompleted] = useState([]);

	const [sortMethod, setSortMethod] = useState(0);
	const [asc, setAsc] = useState(1);
	const [editingId, setEditingId] = useState(-1);

	function handleClose() {
		setOpen(false);
		setEditingId(-1);
		refresh(sortMethod);
	}

	useEffect(() => {
		refresh(sortMethod);
	}, [asc]);

	function refresh(method = 0) {
		setSortMethod(method);
		method += asc;
		var reportList = DBManager.instance.getBugReports(method);
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
		refresh(sortMethod);
	}

	useEffect(() => {
		if (editingId == -1) return;
		setOpen(true);
	}, [editingId]);

	return (
		<>
			<br />
			<h1>Dashboard</h1>

			<CreateBugReportModal
				open={open}
				handleClose={handleClose}
				editingId={editingId}
			/>

			<div className="flex-row">
				{/* <Button variant="contained" onClick={() => refresh(2)}>
					Sort by Priority (Low to High)
				</Button>
				<Button variant="contained" onClick={() => refresh(3)}>
					Sort by Priority (High to Low)
				</Button> */}

				<ButtonGroup
					variant="outlined"
					aria-label="outlined primary button group"
				>
					<FormControl
						sx={{ m: 0, minWidth: 120, color: "lightblue !important", borderColor: "lightblue !important", outlineColor: "lightblue !important" }}
						size="small"
						variant="outlined"
						color="primary"
						className="MuiButton-outlinedPrimary"
					>
						<InputLabel id="demo-select-small-label">Sort</InputLabel>
						<Select
							variant="outlined"
							className="MuiButton-outlinedPrimary"
							labelId="demo-simple-select-error-label"
							id="demo-simple-select-error"
							color="primary"
							value={sortMethod}
							label="Age"
							style={{ color: "lightblue !important" }}
							onChange={(e) => {
								refresh(e.target.value);
							}}
						>
							<MenuItem value={0}>Date</MenuItem>
							<MenuItem value={2}>Priority</MenuItem>
							<MenuItem value={4}>Name</MenuItem>
						</Select>
					</FormControl>
					<Button
						variant="outlined"
						onClick={() => {
							if (asc == 1) {
								setAsc(0);
								// refresh(sortMethod-1);
							} else {
								setAsc(1);
								// refresh(sortMethod+1);
							}
						}}
					>
						<FontAwesomeIcon icon={asc ? faSortAmountAsc : faSortAmountDesc} />
					</Button>
				</ButtonGroup>
			</div>

			<TableContainer component={Paper} className="bugTable">
				<Table stickyHeader>
					<TableHead sx={{ backgroundColor: "#000000" }}>
						<TableRow>
							<TableCell>To-Do</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{todo.map((br, i) => (
							<React.Fragment key={i}>
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
									setEditingId={setEditingId}
								/>
							</React.Fragment>
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
							<React.Fragment key={i}>
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
									setEditingId={setEditingId}
								/>
							</React.Fragment>
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
							<React.Fragment key={i}>
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
									setEditingId={setEditingId}
								/>
							</React.Fragment>
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
					color="warning"
					onClick={() => {
						DBManager.instance.clearTable();
						refresh(sortMethod);
					}}
				>
					Clear Table
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						setEditingId(-1);
						setOpen(true);
					}}
				>
					Create Report
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						BugReportData.upload(() => {
							refresh(sortMethod);
						});
						// refresh(sortMethod);
					}}
				>
					Upload
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
