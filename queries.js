// Task 2 - Below are Queries to:
// 1. Find all books in a specific genre
    db.books.find({ genre: "Adventure" });

// 2. Find books published after a certain year
    db.books.find({ published_year: { $gt: 1945 } });

// 3. Find books by a specific author
     db.books.find({ author: "Herman Melville" });

// 4. Update the price of a specific book
    db.books.updateOne(
  { _id: ObjectId("68528ecf69013888f0beb3b5") }, 
  { $set: { price: 15.5 } }
);

// 5. Delete a book by its title
    db.books.deleteOne({ title: "The Hobbit" });



// Task 3 : Advanced Queries
// 1. A query to find books that are both in stock and published after 2010
   db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});
// It will return a Null value or an empty array since there are no books published after 2010 in our books collection in the database.


// 2. This query uses projection to return only the title, author, and price fields.
db.books.find(
  { in_stock: true }, 
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. A query for sorting to display books by price (both ascending and descending)
// a - for ascending
db.books.find().sort({ price: 1 });

// b - for descending
db.books.find().sort({ price: -1 });

// This query uses the `limit` and `skip` methods to implement pagination (5 books per page)
var page = 1; 
var pageSize = 5; 

db.books.find()
  .skip((page - 1) * pageSize) 
  .limit(pageSize); 


// Task 4 : Aggregation Pipeline
//  1. A query for an aggregation pipeline to calculate the average price of books by genre.
db.books.aggregate([
  {
    $group: {
      _id: "$genre", 
      averagePrice: { $avg: "$price" } 
    }
  }
]);


// 2.  A query for an aggregation pipeline to find the author with the most books in the collection.
db.books.aggregate([
  {
    $group: {
      _id: "$author", 
      bookCount: { $sum: 1 } 
    }
  }
]);


// 3. A query that implements a pipeline that groups books by publication decade and counts them.
db.books.aggregate([
  {
    $project: {
      decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
    }
  },
  {
    $group: {
      _id: "$decade",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 } 
  }
]);
// There is added query for Sorting the decades from lowest to highest. This will make the data more sensible.

// Task 5: Indexing
// 1. A query for creating an index on the `title` field for faster searches.

// STEP 1: Create an index
db.books.createIndex({ title: "text" });
// STEP 2: To check if the index was formed
db.books.getIndexes();
// STEP 3: To check if it works run the query:
db.books.find({ $text: { $search: "Animal" } });
// The above query will show you tne entire document for the Animal.


// 2. A query for creating a compound index on `author` and `published_year`.
db.books.createIndex({ author: 1, published_year: 1 });

// 3. This query is for `explain()` method to demonstrate the performance improvement with your indexes.
db.books.find({ $text: { $search: "Animal" } }).explain("executionStats");
