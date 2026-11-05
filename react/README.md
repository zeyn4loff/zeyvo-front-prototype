# Zeyvo React

Mobile-first React prototype for customer booking and business management. The interface and local workflows are implemented in the browser; the server API will be added later.

## Run

```bash
npm install
npm run dev
```

The Vite output prints the local URL. Build and lint checks:

```bash
npm run build
npm run lint
```

## Accounts and data

Customers can register through the site. Business accounts can register at `/business/auth`. Account profiles, bookings, favorites, and business records are stored in the current browser. Passwords are stored as salted PBKDF2 hashes, not plain text. Clearing site data removes these records.

A populated business account is available for reviewing the existing business modules:

- Email: `admin@bakubeauty.az`
- Password: `zeyvobiz2026`

The seeded business account can change its password in **Profil → Təhlükəsizlik**. Businesses, branches, published services, and available staff are projected into the public catalog from the same browser storage. Customer reservations for those businesses appear in the corresponding partner calendar; partner status changes return to the customer booking list. This works only within one browser profile until a server API is connected. This version does not process payments or send email.
