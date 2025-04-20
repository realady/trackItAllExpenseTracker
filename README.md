# Track It All - SMS Expense Tracker

A powerful mobile application that automatically tracks and analyzes your expenses through SMS notifications. Built with modern web technologies and wrapped in a native mobile app.

## 🌟 Features

- 📱 SMS-based expense tracking
- 📊 Real-time expense analytics and insights
- 💰 Category-wise expense breakdown
- 📈 Visual charts and reports
- 🗓️ Date range filtering
- 🏷️ Custom categorization
- 🌓 Light/Dark theme support
- 📱 Mobile-first responsive design
- 🔄 Automatic SMS parsing
- 🔍 Smart search functionality
- 📊 Export reports to PDF/CSV
- 🎯 Budget tracking & alerts

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Capacitor
- Recharts
- React Query
- React Router
- React Hook Form
- Radix UI Components
- Zod for validation
- Jest for testing
- React Testing Library

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn (v1.22 or higher)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Git

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/realady/trackItAllExpenseTracker.git
cd trackItAllExpenseTracker
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## 📱 Mobile Development

### Android Setup

```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

### iOS Setup (macOS only)

```bash
npm run build
npx cap add ios
npx cap sync
npx cap open ios
```

## 📦 Build for Production

```bash
npm run build
```

## 📱 App Permissions

The application requires the following permissions:
- SMS Read permission
- Internet access
- Storage access (for exports)

## 🔒 Security Features

- End-to-end encryption for data
- Secure local storage

## 🌐 Supported Platforms

- Android 8.0+
- iOS 13.0+
- Modern web browsers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- Follow ESLint configuration
- Run `npm run lint` before committing
- Use Prettier for formatting
- Follow conventional commits

## 🐛 Bug Reports

Report bugs through GitHub issues with:
- Expected behavior
- Actual behavior
- Steps to reproduce
- Platform/device details

## 🗺️ Roadmap

- [ ] Multi-currency support
- [ ] AI-powered categorization
- [ ] Cloud backup/sync
- [ ] Widgets support
- [ ] Share expense reports
- [ ] Budget templates
- [ ] Family sharing
- [ ] Integration with banking APIs

## 📧 Support

For support questions, please use GitHub discussions or reach out to our support team.

---

<div align="center">
Made with ❤️ by the Track It All Team
</div>