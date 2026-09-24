// js/data.js  --  Group Task Race
//
// HOW TO UPDATE:
//   1. Add a new task to TASKS[] (give it the next id, title, dueDate)
//   2. For each group that completes a task, add the task id to completedTasks[]
//   3. From Task 7 onward, set downloadUrl to the Word file path
//   Everything else (counts, rankings, progress, task views) auto-updates.

const GROUPS = [
  {
    id: 1,
    name: "Group 1",
    color: "#ef476f",
    members: ["Ahnaf", "Karthik", "Krishnaram", "Samad", "Nandhu", "Albyalu"],
    completedTasks: [1, 2, 3, 4, 5, 6],
    avatar: "1"
  },
  {
    id: 2,
    name: "Group 2",
    color: "#06d6a0",
    members: ["Amos", "Akshay K", "Abhinav Krishna KV", "Abiprasad", "Nandhana", "Sanjay ps"],
    completedTasks: [1, 2, 3, 4, 5, 6],
    avatar: "2"
  },
  {
    id: 3,
    name: "Group 3",
    color: "#ffd166",
    members: ["Arathi", "Ananya", "Arsaina", "Aneeta"],
    completedTasks: [1, 2, 3, 4, 5, 6],
    avatar: "3"
  },
  {
    id: 4,
    name: "Group 4",
    color: "#118ab2",
    members: ["Reema Ruhana", "Soudha Bheegam", "Suhaima Najeeb", "Thasha Nafsa"],
    completedTasks: [1, 2, 3, 4],
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
    members: ["Shana", "Sruthi", "Nuzha", "Hanna Harees"],
    completedTasks: [],
    avatar: "10"
  },
  {
    id: 11,
    name: "Group 11",
    color: "#402c4fff",
    members: ['Ben', 'Benet', 'Akash', 'Hari Krishnan', 'Suryajith', 'Sreenath'],
    completedTasks: [1, 2, 3, 4],
    avatar: "11"
  },
  {
    id: 12,
    name: "Group 12",
    color: "#4e12d1ff",
    members: ['Ranjusha', 'Reniya', 'Linsa'],
    completedTasks: [1, 2, 3, 4, 5],
    avatar: "12"
  }

];

// ─── ADD NEW TASKS HERE ───────────────────────────────────────────────────────
// Each task needs: id, title, dueDate
// From Task 7 onward, add downloadUrl for the Word file link
//   downloadUrl: "downloads/task7_plan.docx"  (or "" if not ready yet → shows "Coming Soon")

const TASKS = [
  {
    id: 1,
    title: "Django Project Setup",
    dueDate: "2026-09-12"
  },
  {
    id: 2,
    title: "App, URL, View & Template Setup",
    dueDate: "2026-09-13"
  },
  {
    id: 3,
    title: "Login & Register Page Navigation",
    dueDate: "2026-09-14"
  },
  {
    id: 4,
    title: "Login & Registration Forms",
    dueDate: "2026-09-15"
  },
  {
    id: 5,
    title: "GET & POST Form Handling",
    dueDate: "2026-09-16"
  },
  {
    id: 6,
    title: "User Registration & Login Authentication",
    dueDate: "2026-09-17"
  },
  {
    id: 7,
    title: "Admin & Customer Login Separation",
    dueDate: "2026-09-18",
    downloadUrl: "media/Jaybharath_Task_7_Admin_Customer_Login_Separation.docx"  // Add the Word file path here, e.g. "downloads/task7_plan.docx"
  }

];
