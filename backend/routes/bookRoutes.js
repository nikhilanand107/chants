const express = require('express');
const router = express.Router();

// Helper function to map Gutenberg book formats to the structure expected by the frontend
function mapGutenbergBook(book) {
  if (!book) return null;

  // Find a suitable download link (prefer EPUB, then text/plain, then text/html)
  let downloadUrl = '';
  if (book.formats) {
    downloadUrl = book.formats['application/epub+zip'] || 
                  book.formats['text/plain; charset=utf-8'] || 
                  book.formats['text/html'] || 
                  Object.values(book.formats)[0] || '';
  }

  // Get first summary/description if available, or fall back to subjects
  let description = '';
  if (book.summaries && book.summaries.length > 0) {
    description = book.summaries[0];
  } else if (book.subjects && book.subjects.length > 0) {
    description = `Subjects: ${book.subjects.join(', ')}`;
  } else {
    description = 'No description available for this Project Gutenberg title.';
  }

  return {
    id: book.id,
    title: book.title,
    subtitle: book.subjects && book.subjects.length > 0 ? book.subjects.slice(0, 2).join(', ') : '',
    authors: book.authors && book.authors.length > 0 
      ? book.authors.map(a => a.name.split(', ').reverse().join(' ')).join(', ') 
      : 'Unknown Author',
    image: book.formats && book.formats['image/jpeg'] ? book.formats['image/jpeg'] : '',
    url: book.formats && book.formats['text/html'] ? book.formats['text/html'] : '',
    download: downloadUrl,
    publisher: 'Project Gutenberg',
    pages: 'N/A',
    year: book.authors && book.authors.length > 0 && book.authors[0].birth_year
      ? `${book.authors[0].birth_year} - ${book.authors[0].death_year || 'Present'}`
      : 'N/A',
    description: description
  };
}

// Get recent/popular books from Gutendex
router.get('/recent', async (req, res, next) => {
  try {
    const response = await fetch('https://gutendex.com/books/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.json({ status: 'error', books: [] });
    }

    const data = await response.json();
    const mappedBooks = (data.results || []).map(mapGutenbergBook).filter(Boolean);
    
    res.json({ status: 'success', books: mappedBooks });
  } catch (err) {
    console.error('Book Recent Gutendex Proxy Error:', err);
    res.json({ status: 'error', books: [] });
  }
});

// Search books on Gutendex
router.get('/search/:query', async (req, res, next) => {
  try {
    const query = encodeURIComponent(req.params.query);
    const response = await fetch(`https://gutendex.com/books/?search=${query}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.json({ status: 'error', books: [] });
    }

    const data = await response.json();
    const mappedBooks = (data.results || []).map(mapGutenbergBook).filter(Boolean);
    
    res.json({ status: 'success', books: mappedBooks });
  } catch (err) {
    console.error('Book Search Gutendex Proxy Error:', err);
    res.json({ status: 'error', books: [] });
  }
});

// Get Gutenberg book details by ID
router.get('/book/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await fetch(`https://gutendex.com/books/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.status(404).json({ status: 'error', message: 'Book not found' });
    }

    const data = await response.json();
    const mappedBook = mapGutenbergBook(data);
    
    if (!mappedBook) {
      return res.status(404).json({ status: 'error', message: 'Failed to process book data' });
    }

    res.json(mappedBook);
  } catch (err) {
    console.error('Book Details Gutendex Proxy Error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch book details' });
  }
});

module.exports = router;
