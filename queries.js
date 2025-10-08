// Run these with in Compass 
// Find books that are both in stock and published after 2010
// (Adjust published_year as needed depending on your data)
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } }
);

// Test query for existing sample data
db.books.find(
  { in_stock: true, published_year: { $gt: 1959 } }
);

// Projection: return only title, author, and price fields
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
);

//Sorting by price
// Ascending order
db.books.find().sort({ price: 1 });

// Descending order
db.books.find().sort({ price: -1 });

// Pagination (5 books per page)
// Page 1
db.books.find().skip(0).limit(5);
// Page 2
db.books.find().skip(5).limit(5);

// Find books by genre
db.books.find({ genre: "Fiction" });

// Find books published after 1950
db.books.find({ published_year: { $gt: 1950 } });

// Find all books by a specific author
db.books.find({ author: "George Orwell" });

// Find book by title
db.books.find({ title: "1984" });

// Find books in stock and published after 1959
db.books.find({ in_stock: true, published_year: { $gt: 1959 } });


// Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]);

// Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 } // Top author
]);

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      },
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// Create index on "title"
db.books.createIndex({ title: 1 });

// Create compound index on "author" and "published_year"
db.books.createIndex({ author: 1, published_year: 1 });

// Explain performance difference
db.books.find({ author: "George Orwell" }).explain("executionStats");
