import { collection, getFirestore } from "firebase/firestore";
import { db } from "./Auth";


const { BugReport } = require("./BugReport");

class DBManager {
    constructor() {
        // use the localstorage to store the data
        this.db = window.localStorage;
        // if ()
        // collection(db, "users/" ).get().then((querySnapshot) => {
        // }
        this.reports = this.getFromStorage() || {};
    }

    getFromStorage(key) {
        try {
            return JSON.parse(this.db.getItem(key));
        } catch (e) {
            return null;
        }
    }

    saveToStorage(key, value) {
        this.db.setItem(key, JSON.stringify(value));
    }

    autoSave() {
        this.saveToStorage("reports", this.reports);
    }

    createDB() {
        // create the database
        this.reports = {};
    }

    createBugReport(name, description, priority) {
        var date = new Date();
        var br = BugReport(name, description, priority, date);
        this.reports[br.id] = br;
        this.autoSave();
    }

    getBugReport(id) {
        return this.reports[id];
    }

    getBugReports(sort = 0) {
        // 0 is by date, 1 is by priority, 2 is by name
        var sorted = [];
        switch (sort) {
            case 0:
                sorted = Object.values(this.reports).sort((a, b) => a.date - b.date);
                break;
            case 1:
                sorted = Object.values(this.reports).sort((a, b) => a.priority - b.priority);
                break;
            case 2:
                sorted = Object.values(this.reports).sort((a, b) => a.name - b.name);
                break;
            default:
                sorted = Object.values(this.reports);
                break;
        }
        return sorted;
    }

}