import {
	Button,
	Modal,
	Select,
	TableCell,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import DBManager from "./DBManager";

export class BugReportData {
	constructor(name, description, priority, date) {
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.date = date;
		this.id = DBManager.instance.getBugReportID();
	}

	static fromJSON(json) {
		return new BugReportData(
			json.name,
			json.description,
			json.priority,
			json.date
		);
	}

	toJSON() {
		return {
			name: this.name,
			description: this.description,
			priority: this.priority,
			date: this.date,
		};
	}
}

export default function BugReport(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [date, setDate] = useState("");

	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const [startPos, setStartPos] = useState({ x: 0, y: 0 });

	const [isDragging, setIsDragging] = useState(false);

	const drag = useRef(null);
	const orig = useRef(null);

	useEffect(() => {
		var bugRep = props.bugRep;
		setName(bugRep.name);
		setDescription(bugRep.description);
		setPriority(bugRep.priority);
		setDate(new Date(bugRep.date).toDateString());
		setHeight(orig.current.offsetHeight);
		setWidth(orig.current.offsetWidth);
	}, [props.bugRep]);

	useEffect(() => {
		if (isDragging) {
			drag.current.style.width = width + "px";
			drag.current.style.height = height + "px";
		}
	}, [isDragging]);

	function startDrag(e) {
		setIsDragging(true);
		setStartPos({ x: e.clientX, y: e.clientY });
	}

	function endDrag() {
		setIsDragging(false);
		console.log("end drag");
	}

	const [close, setClose] = useState(false);

	function mouseMove(e) {
		if (isDragging) {
			console.log("dragging");
			drag.current.style.left = e.clientX - drag.current.offsetWidth / 2 + "px";
			drag.current.style.top = e.clientY - drag.current.offsetHeight / 2 + "px";
			var dist = Math.sqrt(
				Math.pow(e.clientX - startPos.x, 2) +
					Math.pow(e.clientY - startPos.y, 2)
			);
			if (dist < 150) {
				setClose(true);
			} else {
				setClose(false);
			}
		}
	}

	return (
		<TableRow
			onMouseDown={startDrag}
			onMouseUp={endDrag}
			onMouseMove={mouseMove}
			onMouseLeave={endDrag}
		>
			<TableCell>
				{isDragging ? (
					<>
						<div className="absReport report" ref={drag}>
							<h5>{name}</h5>
							<p>{description}</p>
							<p>{priority}</p>
							<p>{date}</p>
						</div>
						<div className={close ? "otherReport report" : "fakeReport report"}>
							<h5>{name}</h5>
							<p>{description}</p>
							<p>{priority}</p>
							<p>{date}</p>
						</div>
					</>
				) : (
					<>
						<div className="trueReport report" ref={orig}>
							<h5>{name}</h5>
							<p>{description}</p>
							<p>{priority}</p>
							<p>{date}</p>
						</div>
					</>
				)}
			</TableCell>
		</TableRow>
	);
}

export function CreateBugReportModal(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");

	function createReport() {
		var date = new Date();
		var report = new BugReportData(name, description, priority, date);

		DBManager.getInstance().createBugReport(name, description, priority);
		DBManager.getInstance().autoSave();
		console.log(report);
		props.handleClose();
	}

	return (
		<Modal open={props.open} onClose={props.handleClose}>
			<div className="bugModal">
				<h1>Report</h1>
				<p>Name</p>
				<TextField
					id="outlined-basic"
					label="Name"
					variant="outlined"
					autoComplete="off"
					autoCorrect="off"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<p>Description</p>
				<TextField
					id="outlined-multiline-static"
					multiline
					rows={4}
					label="Description"
					variant="outlined"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				<p>Priority</p>
				<Select
					native
					value={10}
					onChange={(e) => {
						setPriority(e.target.value);
					}}
				>
					<option value={10}>Low</option>
					<option value={20}>Medium</option>
					<option value={30}>High</option>
				</Select>
				<br />
				<Button onClick={createReport} variant="contained">
					Submit
				</Button>
			</div>
		</Modal>
	);
}
