export const pages = [
  { key: 'home',    url: '/',          href: 'index.html',   title: 'Home',    text: 'Welcome to the Home page.' },
  { key: 'about',   url: '/about',     href: 'about.html',   title: 'About',   text: 'This is the About page.' },
  { key: 'contact', url: '/contact',   href: 'contact.html', title: 'Contact', text: 'Reach us via contact page.' },
];

export const pageText = Object.fromEntries(
  pages.map(p => [p.key, p.text])
);