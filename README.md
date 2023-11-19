# Log_Ingestor_and_Query_Interface

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   git clone https://github.com/<VishnuH28>/<Log_Ingestor_and_query_Interface>.git

   cd <Log_Ingestor_and_Query_Interface>

3. Install dependencies:
   npm install

Log Ingestor
Start the log ingestor server:
npm run ingestor

Logs can be ingested by sending POST requests to http://localhost:3000/logs with log data in the specified format.

Query Interface
Start the query interface:

npm run query
Access the query interface at http://localhost:3001 in your browser.

Use the interface to perform full-text search and filtering on the ingested logs.
