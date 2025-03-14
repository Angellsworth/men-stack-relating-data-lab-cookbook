# 🥫 Shelf Help - The Ultimate Pantry Tracker

![Shelf Help](public/images/pantry-screenshot.jpg)

## 📌 Overview
**Shelf Help** is a pantry-tracking app designed to help you keep an eye on what’s in your pantry, making it easier to plan meals, avoid food waste, and stay organized. Built with **MongoDB, Express, Node.js, and EJS**, this project solidifies CRUD operations—one of the most foundational concepts in full-stack development.

## 🎯 User Stories
- **As a user**, I want to sign up and sign in so I can manage my pantry.
- **As a user**, I want to add food items to my pantry with a name and quantity.
- **As a user**, I want to edit pantry items if I need to update the quantity or name.
- **As a user**, I want to delete pantry items I no longer have.
- **As a user**, I want to see a list of all my pantry items displayed in an easy-to-read format.
- **As a user**, I want to explore a **Community Page** where I can see other users and what’s in their pantry for inspiration.
- **As a user**, I want to view another user's pantry when I click on their name.

---

## 🏗️ How It Works

This app follows the **CRUD (Create, Read, Update, Delete)** structure:

| Action       | HTTP Method | Route                     | Description                        |
|-------------|------------|---------------------------|------------------------------------|
| **Create**  | `POST`     | `/users/:userId/foods`    | Add a new pantry item             |
| **Read**    | `GET`      | `/users/:userId/foods`    | View all pantry items             |
| **Update**  | `PUT`      | `/users/:userId/foods/:id`| Edit a pantry item                |
| **Delete**  | `DELETE`   | `/users/:userId/foods/:id`| Remove an item from the pantry    |

---

## 🚀 Setup Instructions

### **1️⃣ Clone the Repo**
```bash
git clone https://github.com/your-username/pantry-app.git
cd pantry-app