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
	constructor(name, description, priority, date, id=0) {
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
			json.date,
			json.id
		);
	}

	toJSON() {
		return {
			name: this.name,
			description: this.description,
			priority: this.priority,
			date: this.date,
			id: this.id,
		};
	}
}

export function FakeBugReport(props) {
	const ref = useRef(null);
	const [close, setClose] = useState(false);

	useEffect(() => {
		if (props.mouseCol == props.col) {
			setClose(false);
			return;
		}
		if (!props.dragging) {
			if (close) {
				props.moveBR(props.col);
			}
			setClose(false);
			return;
		}
		
		console.log(props.mousePos);
		if (props.dragging && props.mousePos) {
			var left = ref.current.getBoundingClientRect().left + ref.current.offsetWidth / 2;
			var top = ref.current.getBoundingClientRect().top + ref.current.offsetHeight;
			// if pos is within 150px of mousePos, set close to true
			var dist = Math.sqrt(
				Math.pow(props.mousePos.x - left, 2) +
					Math.pow(props.mousePos.y - top, 2)
			);
			
			if (dist < 100) {
				console.log("CLOSE");
				setClose(true);
			} else {
				setClose(false);
			}
		}
	}, [props.mousePos, props.dragging, props.mouseCol]);

	return (
		<TableRow ref={ref}>
			<div className={close ? "fakeClose" : "fakeFar"}></div>
		</TableRow>
	);
}

export default function BugReport(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [date, setDate] = useState("");
	const [id, setId] = useState(0);

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
		setId(bugRep.id);
		setHeight(orig.current.offsetHeight);
		setWidth(orig.current.offsetWidth);
	}, [props.bugRep]);

	useEffect(() => {
		if (isDragging) {
			drag.current.style.width = width + "px";
			drag.current.style.height = height + "px";
			drag.current.style.left = startPos.x - drag.current.offsetWidth / 2 + "px";
			drag.current.style.top = startPos.y - drag.current.offsetHeight / 2 + "px";
		}
	}, [isDragging]);

	function startDrag(e) {
		e.preventDefault();
		setIsDragging(true);
		props.setBugId(id);
		props.setDragging(true);
		props.setMouseCol(props.col);
		setStartPos({ x: e.clientX, y: e.clientY });
	}

	function endDrag() {
		if (isDragging) {
			setIsDragging(false);
			props.setDragging(false);
		}
		console.log("end drag");
	}

	const [close, setClose] = useState(false);

	function mouseMove(e) {
		e.preventDefault();
		e.stopPropagation();
		if (isDragging) {
			console.log("dragging");
			drag.current.style.left = e.clientX - drag.current.offsetWidth / 2 + "px";
			drag.current.style.top = e.clientY - drag.current.offsetHeight / 2 + "px";
			props.setMousePos({ x: e.clientX, y: e.clientY });
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
			className={close || !isDragging ? "close" : "far"}
		>
			<TableCell>
				{isDragging ? (
					<>
						<div className="absReport report" ref={drag}>
							<h5>{name}</h5>
							<p>{description}</p>
							<p>{priority==30 ? "High" : priority==20 ? "Med" : "Low"}</p>
							<p>{date}</p>
						</div>
						<div className={close ? "otherReport report" : "fakeReport report"}>
							<h5>{name}</h5>
							<p>{description}</p>
							<p>{priority==30 ? "High" : priority==20 ? "Med" : "Low"}</p>
							<p>{date}</p>
						</div>
					</>
				) : (
					<>
						<div className="trueReport report" unselectable="true" ref={orig}>
							<h5>{name}</h5>
							<p>{description}</p>
							<p>{priority==30 ? "High" : priority==20 ? "Med" : "Low"}</p>
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
					value={priority}
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
