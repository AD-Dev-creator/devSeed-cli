export const nodeJSTemplate = {
  //* Main server file
  "src/main.js": `import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "./routes.js";

dotenv.config();

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`,

  //* Routes file
  "src/routes.js": `import { Router } from "express";

export const router = Router();
`,

  //* Gitignore file
  ".gitignore": `node_modules
.env
`,

  //* Environment variables file
  ".env": `PORT=3000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
`,

  //* Environment variables example file
  ".env.example": `PORT=your_port
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
`,

  //* README file
  "README.md": `# Node.js REST API Template

1. Set up your environment 
\`\`\`bash
  npm install
\`\`\`

2. Run the server
\`\`\`bash
  npm start
\`\`\`
`,
};
