// js/data.js  --  Group Task Race
//
// HOW TO UPDATE:
//   1. Add a new task to TASKS[] (give it the next id, title, dueDate)
//   2. For each group that completes a task, add the task id to completedTasks[]
//   Everything else (counts, rankings, progress, task views) auto-updates.

const GROUPS = [
  {
    id: 1,
    name: "Group 1",
    color: "#ef476f",
    members: ["Ahnaf", "Karthik", "Krishnaram", "Samad", "Nandhu", "Albyalu"],
    completedTasks: [1],
    avatar: "1"
  },
  {
    id: 2,
    name: "Group 2",
    color: "#06d6a0",
    members: ["Amos", "Akshay K", "Abhinav Krishna KV", "Abiprasad", "Nandhana", "Sanjay ps"],
    completedTasks: [1, 2],
    avatar: "2"
  },
  {
    id: 3,
    name: "Group 3",
    color: "#ffd166",
    members: ["Arathi", "Ananya", "Arsaina", "Aneeta"],
    completedTasks: [1, 2],
    avatar: "3"
  },
  {
    id: 4,
    name: "Group 4",
    color: "#118ab2",
    members: ["Reema Ruhana", "Soudha Bheegam", "Suhaima Najeeb", "Thasha Nafsa"],
    completedTasks: [],
    avatar: "4"
  },
  {
    id: 5,
    name: "Group 5",
    color: "#9b5de5",
    members: ["Sooraj", "Pranav", "Adithyan G", "Harikrishnan N R", "Siva", "Joshua"],
    completedTasks: [],
    avatar: "5"
  },
  {
    id: 6,
    name: "Group 6",
    color: "#f77f00",
    members: ["Ambady", "Yazeen", "Sinan", "Vishnu", "Abhinav", "Adil T", "Ashfaq"],
    completedTasks: [],
    avatar: "6"
  },
  {
    id: 7,
    name: "Group 7",
    color: "#4cc9f0",
    members: ["Anujith Sabu", "Ajsal", "Joshua", "Rahul"],
    completedTasks: [],
    avatar: "7"
  },
  {
    id: 8,
    name: "Group 8",
    color: "#e63946",
    members: ["Rizan", "Kiran", "Shone", "Naveen"],
    completedTasks: [],
    avatar: "8"
  },
  {
    id: 9,
    name: "Group 9",
    color: "#2dc653",
    members: ["Alshan", "Sinan OP", "Safvan", "Sreesanth"],
    completedTasks: [],
    avatar: "9"
  },
  {
    id: 10,
    name: "Group 10",
    color: "#c77dff",
    members: ["Shana", "Shahma", "Nuzha"],
    completedTasks: [],
    avatar: "10"
  },
  {
    id: 11,
    name: "Group 11",
    color: "#402c4fff",
    members: ['Ben', 'Benet', 'Akash', 'Hari Krishnan', 'Suryajith', 'Sreenath'],
    completedTasks: [],
    avatar: "11"
  }

];

// ─── ADD NEW TASKS HERE ───────────────────────────────────────────────────────
// Each task is automatically assigned to ALL groups.
// Just update completedTasks[] above for the groups that finish each task.
const TASKS = [
  {
    id: 1,
    title: "Task 1",
    dueDate: "2026-09-07"
  },
  {
    id: 2,
    title: "Task 2",
    dueDate: "2026-09-08"
  },
  {
    id: 3,
    title: "Task 3",
    dueDate: "2026-09-09"
  }

];
