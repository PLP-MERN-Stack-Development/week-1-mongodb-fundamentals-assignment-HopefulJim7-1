Here’s a **README.md** file summarizing everything I have done, from initializing **pnpm** to crafting **MongoDB queries** for my book collection—complete with ✨ emojis for style!

```markdown
# 📚 Book Collection & PNPM Setup 🚀

## 🎯 Project Overview
This project sets up **pnpm** for package management and includes **MongoDB queries** optimized with indexes to efficiently retrieve book data.

---

## 🛠️ Setting Up PNPM 🏗️

1️⃣ **Install PNPM** (if not installed):
   ```sh
   npm install -g pnpm
   ```

2️⃣ **Initialize a PNPM project**:
   ```sh
   pnpm init
   ```
   This creates a `package.json` for managing dependencies.

3️⃣ **Install dependencies** (example: MongoDB package):
   ```sh
   pnpm add mongodb
   ```

4️⃣ **Run PNPM commands** (This will connect to MongoDB, insert the sample book data, and display the inserted 
 records.):
   ```sh
   node insert_books.js
   ```

---

## 📖 MongoDB Indexing & Queries ⚡

### **🔍 Creating Indexes**
✅ **Text Index for Book Titles**:
```javascript
db.books.createIndex({ title: "text" });
```
- Enables **flexible keyword searches** on book titles.

✅ **Compound Index for Author & Year**:
```javascript
db.books.createIndex({ author: 1, published_year: 1 });
```
- **Speeds up searches** filtering by `author` and sorting by `published_year`.

✅ **Mixed Index (Text & Numeric)**:
```javascript
db.books.createIndex({ title: "text", published_year: 1 });
```
- **Allows text searches** and **efficient year filtering**.

---

### **🔎 Querying the Book Collection**

**📌 Find books by title using Text Search**:
```javascript
db.books.find({ $text: { $search: "Animal" } });
```
- Retrieves books **matching the keyword** `"Animal"`.

**📌 Retrieve books by an author sorted by year**:
```javascript
db.books.find({ author: "George Orwell" }).sort({ published_year: 1 });
```
- Returns **Orwell’s books, sorted from oldest to newest**.

**📌 Find books published **after** a given year**:
```javascript
db.books.find({ published_year: { $gt: 2000 } });
```
- Fetches books **published after 2000**.

**📌 Drop an index**:
```javascript
db.books.dropIndex("title_text");
```
- **Removes the text index** from `title`.

---

## 🚀 Checking Performance with `explain()`
Use MongoDB's `explain()` method to analyze query efficiency.

**📌 Check how indexes optimize searches**:
```javascript
db.books.find({ $text: { $search: "Hobbit" } }).explain("executionStats");
```
- Shows whether the **index is used**, improving query speed.

---

## ✅ Final Thoughts 🧠
With **pnpm setup**, **indexed queries**, and **optimized searches**, your **book collection database** is 
structured for **fast and efficient retrieval**! 🎉

---
