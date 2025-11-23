import { Book, BookStatus, User, UserRole, Notification } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Algorithm',
    author: 'Ada Lovelace',
    coverUrl: 'https://picsum.photos/300/450?random=1',
    category: 'Technology',
    description: 'A deep dive into the history of computing and the future of AI algorithms.',
    status: BookStatus.AVAILABLE,
    isbn: '978-3-16-148410-0',
    rating: 4.8,
    publishedYear: 2023,
    reviews: [
      { id: 'r1', userId: 'u2', userName: 'John Doe', rating: 5, comment: 'Mind blowing!', date: '2023-10-12' }
    ]
  },
  {
    id: '2',
    title: 'Silent Cosmos',
    author: 'Carl Sagan II',
    coverUrl: 'https://picsum.photos/300/450?random=2',
    category: 'Science',
    description: 'Exploring the quiet corners of the universe and dark matter.',
    status: BookStatus.BORROWED,
    isbn: '978-1-40-289462-6',
    rating: 4.5,
    publishedYear: 2021,
    dueDate: '2023-12-01',
    reviews: []
  },
  {
    id: '3',
    title: 'Design Systems 101',
    author: 'Sarah Drasner',
    coverUrl: 'https://picsum.photos/300/450?random=3',
    category: 'Design',
    description: 'Building scalable UI libraries for modern web applications.',
    status: BookStatus.AVAILABLE,
    isbn: '978-0-13-235088-4',
    rating: 4.9,
    publishedYear: 2024,
    reviews: []
  },
  {
    id: '4',
    title: 'The Lost City of Z',
    author: 'David Grann',
    coverUrl: 'https://picsum.photos/300/450?random=4',
    category: 'History',
    description: 'A tale of deadly obsession in the Amazon.',
    status: BookStatus.AVAILABLE,
    isbn: '978-0-385-51353-2',
    rating: 4.2,
    publishedYear: 2009,
    reviews: []
  },
  {
    id: '5',
    title: 'React Patterns',
    author: 'Michael Chan',
    coverUrl: 'https://picsum.photos/300/450?random=5',
    category: 'Technology',
    description: 'Advanced patterns for building resilient React applications.',
    status: BookStatus.RESERVED,
    isbn: '978-1-491-95202-4',
    rating: 4.7,
    publishedYear: 2022,
    reviews: []
  },
  {
    id: '6',
    title: 'Culinary Arts',
    author: 'Julia Child',
    coverUrl: 'https://picsum.photos/300/450?random=6',
    category: 'Cooking',
    description: 'Mastering the art of French cooking for the modern era.',
    status: BookStatus.AVAILABLE,
    isbn: '978-0-394-40135-6',
    rating: 4.6,
    publishedYear: 1961,
    reviews: []
  },
  {
    id: '7',
    title: 'Zero to One',
    author: 'Peter Thiel',
    coverUrl: 'https://picsum.photos/300/450?random=7',
    category: 'Business',
    description: 'Notes on startups, or how to build the future.',
    status: BookStatus.AVAILABLE,
    isbn: '978-0-8041-3929-8',
    rating: 4.5,
    publishedYear: 2014,
    reviews: []
  },
  {
    id: '8',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://picsum.photos/300/450?random=8',
    category: 'Sci-Fi',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.',
    status: BookStatus.BORROWED,
    isbn: '978-0-441-17271-9',
    rating: 4.9,
    publishedYear: 1965,
    dueDate: '2023-11-25',
    reviews: []
  }
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Librarian',
  email: 'alex@smartlib.com',
  role: UserRole.USER,
  avatarUrl: 'https://picsum.photos/100/100?random=99',
  borrowedBooks: ['2', '8'],
  favorites: ['1', '3'],
  creditScore: 780,
  achievements: [
    {
      id: 'a1',
      title: 'Bookworm',
      description: 'Borrowed 10+ books',
      icon: 'BookOpen',
      unlockedAt: '2023-09-15'
    },
    {
      id: 'a2',
      title: 'Punctual',
      description: 'Returned 5 books on time',
      icon: 'Clock',
      unlockedAt: '2023-10-01'
    }
  ]
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Book Due Soon',
    message: 'The book "Silent Cosmos" is due in 3 days.',
    read: false,
    date: '2h ago',
    type: 'warning'
  },
  {
    id: 'n2',
    title: 'Reservation Available',
    message: 'The book "React Patterns" is now available for pickup.',
    read: false,
    date: '1d ago',
    type: 'success'
  }
];