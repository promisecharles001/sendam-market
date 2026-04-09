# Getting Started

<cite>
**Referenced Files in This Document**
- [package.json](file://package.json)
- [DATABASE_SETUP_GUIDE.md](file://DATABASE_SETUP_GUIDE.md)
- [FIND_DATABASE_URL_GUIDE.md](file://FIND_DATABASE_URL_GUIDE.md)
- [VERCEL_DEPLOYMENT_GUIDE.md](file://VERCEL_DEPLOYMENT_GUIDE.md)
- [prisma/schema.prisma](file://prisma/schema.prisma)
- [vercel.json](file://vercel.json)
- [next.config.mjs](file://next.config.mjs)
- [middleware.ts](file://middleware.ts)
- [app/env-setup.tsx](file://app/env-setup.tsx)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Development Environment Configuration](#development-environment-configuration)
6. [Database Setup](#database-setup)
7. [Initial Project Run](#initial-project-run)
8. [Prisma Studio](#prisma-studio)
9. [Verification Checklist](#verification-checklist)
10. [Common Setup Issues and Solutions](#common-setup-issues-and-solutions)
11. [Deployment to Vercel](#deployment-to-vercel)
12. [Troubleshooting Guide](#troubleshooting-guide)
13. [Conclusion](#conclusion)

## Introduction
Sendam Marketplace is a modern e-commerce platform built with Next.js 14, TypeScript, Prisma ORM, and PostgreSQL. The application provides marketplace functionality including user authentication, item listings, purchasing workflows, admin management, and escrow-based transactions. This guide will help you set up the development environment, configure the database, and run the application locally for the first time.

## Project Structure
The project follows a Next.js App Router structure with the following key areas:
- app/: Application routes and pages
- components/: Reusable React components
- lib/: Shared utilities, actions, and integrations
- prisma/: Database schema and migrations
- scripts/: Helper scripts for seeding and deployment
- public/: Static assets

```mermaid
graph TB
subgraph "Application"
APP["App Router<br/>app/"]
CMPS["Components<br/>components/"]
LIB["Lib Utilities<br/>lib/"]
end
subgraph "Database Layer"
PRISMA["Prisma Schema<br/>prisma/schema.prisma"]
MIGR["Migrations<br/>prisma/migrations/"]
end
subgraph "Configuration"
PKG["Package Scripts<br/>package.json"]
NEXT["Next Config<br/>next.config.mjs"]
VERCEL["Vercel Config<br/>vercel.json"]
end
APP --> CMPS
APP --> LIB
LIB --> PRISMA
PRISMA --> MIGR
PKG --> APP
NEXT --> APP
VERCEL --> APP
```

**Diagram sources**
- [package.json:1-93](file://package.json#L1-L93)
- [prisma/schema.prisma:1-240](file://prisma/schema.prisma#L1-L240)
- [next.config.mjs:1-28](file://next.config.mjs#L1-L28)
- [vercel.json:1-17](file://vercel.json#L1-L17)

**Section sources**
- [package.json:1-93](file://package.json#L1-L93)
- [prisma/schema.prisma:1-240](file://prisma/schema.prisma#L1-L240)

## Prerequisites
Before setting up Sendam Marketplace, ensure you have the following installed:

### Node.js and Package Manager
- Node.js 18.x or later
- pnpm 8.x or later (recommended for this project)

### Database
- PostgreSQL 12 or later (for local development)
- Docker (optional, for containerized database)

### Development Tools
- Git for version control
- Code editor with TypeScript support
- Browser for testing

**Section sources**
- [package.json:16-81](file://package.json#L16-L81)

## Installation
Follow these steps to install and set up the project locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sendam-market
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Verify Prisma Client Generation
```bash
pnpm run db:generate
```

**Section sources**
- [package.json:5-14](file://package.json#L5-L14)

## Development Environment Configuration
The application requires several environment variables for proper operation. While the project includes an environment setup component, you'll need to configure the following variables:

### Required Environment Variables
Create a `.env.local` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/sendam_marketplace

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_random_string_here

# OAuth Configuration (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin Configuration
ADMIN_EMAILS=admin@example.com,user@example.com

# Optional: Cron Security
CRON_SECRET=your_cron_secret_here
```

### Environment Setup Component
The application includes a helpful setup component that demonstrates the required configuration:

```mermaid
flowchart TD
ENVSETUP["EnvSetup Component<br/>app/env-setup.tsx"] --> INPUT["User Inputs<br/>Supabase URL & Key"]
INPUT --> VALIDATE["Validation Logic"]
VALIDATE --> SAVE["Save to .env.local<br/>(Demonstration)"]
SAVE --> ALERT["Show Instructions"]
ALERT --> MANUAL["Manual Setup Required"]
```

**Diagram sources**
- [app/env-setup.tsx:1-76](file://app/env-setup.tsx#L1-L76)

**Section sources**
- [app/env-setup.tsx:1-76](file://app/env-setup.tsx#L1-L76)

## Database Setup
Sendam Marketplace uses Prisma ORM with PostgreSQL. Configure your database according to your preferred method:

### Local PostgreSQL Setup
1. Install and start PostgreSQL
2. Create a database named `sendam_marketplace`
3. Create a user with appropriate permissions
4. Set the DATABASE_URL environment variable

### Vercel Postgres (Production Recommended)
1. Go to Vercel Dashboard
2. Select your project
3. Navigate to Storage tab
4. Create a new Postgres database
5. Copy the connection string (POSTGRES_PRISMA_URL)
6. Add it to your Vercel project environment variables as DATABASE_URL

### Database Schema and Models
The Prisma schema defines the core data model:

```mermaid
erDiagram
USER {
string id PK
string email UK
string name
string passwordHash
string avatar
datetime createdAt
datetime updatedAt
}
CATEGORY {
string id PK
string name UK
string slug UK
string description
string icon
string color
boolean featured
int order
datetime createdAt
datetime updatedAt
enum status
}
ITEM {
string id PK
string title
string slug UK
string description
float price
enum condition
string location
string[] images
boolean isPublished
enum status
float originalPrice
string phone
string whatsapp
string address
string[] tags
int views
datetime expiresAt
boolean negotiable
boolean urgent
datetime createdAt
datetime updatedAt
}
USER ||--o{ ITEM : creates
CATEGORY ||--o{ ITEM : categorizes
```

**Diagram sources**
- [prisma/schema.prisma:15-99](file://prisma/schema.prisma#L15-L99)

**Section sources**
- [prisma/schema.prisma:1-240](file://prisma/schema.prisma#L1-L240)
- [DATABASE_SETUP_GUIDE.md:1-96](file://DATABASE_SETUP_GUIDE.md#L1-L96)
- [FIND_DATABASE_URL_GUIDE.md:1-65](file://FIND_DATABASE_URL_GUIDE.md#L1-L65)

## Initial Project Run
Start the development server with the following steps:

### 1. Database Migration
First, ensure your database is migrated:
```bash
pnpm run db:push
```

### 2. Start Development Server
```bash
pnpm run dev
```

The application will start on http://localhost:3000 by default.

### 3. Authentication Flow
The middleware protects certain routes:
- `/sell` requires authentication
- `/admin` requires admin privileges
- `/api/auth` routes are always accessible

**Section sources**
- [middleware.ts:1-40](file://middleware.ts#L1-L40)
- [next.config.mjs:21-25](file://next.config.mjs#L21-L25)

## Prisma Studio
Prisma Studio provides a graphical interface for managing your database:

### Access Prisma Studio
```bash
pnpm run db:studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all records across tables
- Create, update, and delete entries
- Search and filter data
- Visualize relationships between entities

**Section sources**
- [package.json:9](file://package.json#L9)

## Verification Checklist
Complete these steps to ensure everything is working correctly:

### 1. Application Startup
- [ ] Development server starts without errors
- [ ] Browser opens at http://localhost:3000
- [ ] No console errors in the browser

### 2. Database Connectivity
- [ ] Prisma client generates successfully
- [ ] Database migrations applied
- [ ] Prisma Studio connects without errors

### 3. Authentication
- [ ] NextAuth middleware loads
- [ ] Login routes accessible
- [ ] Protected routes redirect appropriately

### 4. Core Functionality
- [ ] Marketplace page loads
- [ ] Item listings display
- [ ] Basic navigation works

## Common Setup Issues and Solutions

### Prisma Client Build Error
**Issue**: Module not found: Can't resolve '.prisma/client/index-browser'
**Solution**: Update your build configuration as per the deployment fix guide.

### Database Connection Issues
**Issue**: Cannot connect to PostgreSQL
**Solutions**:
- Verify PostgreSQL is running locally
- Check DATABASE_URL format and credentials
- Ensure database exists and user has permissions

### Environment Variables Missing
**Issue**: Application crashes due to missing environment variables
**Solutions**:
- Create `.env.local` file with required variables
- Restart development server after adding variables
- Verify NEXTAUTH_URL matches your deployment URL

### Port Conflicts
**Issue**: Port 3000 already in use
**Solutions**:
- Change port in next.config.mjs
- Kill process using port 3000
- Use different port number

### OAuth Configuration Issues
**Issue**: Google OAuth redirects fail
**Solutions**:
- Add localhost to authorized origins
- Configure redirect URIs for development
- Verify client ID and secret are correct

**Section sources**
- [VERCEL_DEPLOYMENT_GUIDE.md:1-114](file://VERCEL_DEPLOYMENT_GUIDE.md#L1-L114)

## Deployment to Vercel
The project is configured for seamless Vercel deployment:

### Build Configuration
The deployment uses custom build commands:
- Install: `pnpm install`
- Build: `pnpm run vercel-build` (runs Prisma generate + Next build)

### Required Environment Variables
Set these in your Vercel project settings:
- DATABASE_URL (production PostgreSQL connection)
- NEXTAUTH_URL (your deployed domain)
- NEXTAUTH_SECRET (secure random string)
- GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- ADMIN_EMAILS (comma-separated admin emails)
- CRON_SECRET (optional, for auto-release cron)

### Cron Jobs
The Vercel configuration includes a scheduled cron job:
- Path: `/api/cron/auto-release`
- Schedule: Daily at midnight (0 0 * * *)

**Section sources**
- [vercel.json:1-17](file://vercel.json#L1-L17)
- [VERCEL_DEPLOYMENT_GUIDE.md:43-65](file://VERCEL_DEPLOYMENT_GUIDE.md#L43-L65)

## Troubleshooting Guide

### Development Server Issues
1. **Port conflicts**: Change port in next.config.mjs or kill conflicting process
2. **Missing dependencies**: Run `pnpm install` and `pnpm run postinstall`
3. **TypeScript errors**: Ignore during development with `next.config.mjs`

### Database Issues
1. **Migration failures**: Check Prisma schema syntax and run `pnpm run db:push`
2. **Connection timeouts**: Verify database accessibility and network configuration
3. **Schema mismatches**: Use `pnpm run db:generate` to regenerate client

### Authentication Problems
1. **NextAuth errors**: Verify NEXTAUTH_URL matches deployment URL
2. **Callback issues**: Check OAuth redirect URIs in provider console
3. **Admin access**: Ensure ADMIN_EMAILS contains your email address

### Performance Optimization
1. **Large datasets**: Consider implementing pagination and indexing
2. **Image optimization**: Leverage Next.js image optimization features
3. **Database queries**: Use Prisma's query optimization features

**Section sources**
- [next.config.mjs:1-28](file://next.config.mjs#L1-L28)
- [middleware.ts:1-40](file://middleware.ts#L1-L40)

## Conclusion
You're now ready to develop and run Sendam Marketplace locally. The project provides a solid foundation with modern technologies and includes helpful components for environment configuration and database management. For production deployment, follow the Vercel deployment guide and ensure all environment variables are properly configured in your Vercel project settings.

Key takeaways:
- Use Prisma for database operations and schema management
- Leverage Next.js App Router for clean routing
- Implement proper authentication with NextAuth
- Utilize Vercel for seamless deployment
- Test thoroughly using Prisma Studio and the development server

Happy coding!