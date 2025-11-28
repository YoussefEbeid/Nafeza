# Nafeza

National Single Window platform for managing shipments and ACI (Advanced Cargo Information) declarations.

## Project Structure

```
Nafeza/
├── client/          # Next.js frontend application
└── Server/          # ASP.NET Core backend API
```

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management

### Backend
- **ASP.NET Core 8** - Web API framework
- **Entity Framework Core** - ORM
- **JWT Authentication** - Security
- **Clean Architecture** - Domain, Application, Infrastructure layers

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK
- SQL Server (or SQL Server Express)

### Running the Application

#### Backend (Server)
```bash
cd Server
dotnet restore
dotnet run
```
Server will run on `http://localhost:5195`

#### Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Client will run on `http://localhost:3000`

## Features

- User authentication (Importer/Exporter login)
- ACI (Advanced Cargo Information) declaration management
- Party management (Importers, Exporters, Customs Brokers)
- JWT-based authentication
- CORS-enabled API

## Login Credentials

### Importer
- **Tax ID**: `100-200-300`
- **Email**: `info@elsewedy.com`
- **Password**: `admin123`

### Exporter
- **Email**: `sales@shenzhen.cn`
- **CargoX ID**: `CX-99887766`
- **Password**: `exporter123`

## License

This project is for interview/demonstration purposes.

