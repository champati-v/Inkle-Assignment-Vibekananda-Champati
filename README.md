# Inkle Assignment for Frontend Internship

This project is a frontend assignment built using **Next.js**, **TypeScript**, **Tailwind CSS**, **ShadCN UI**, and **TanStack Table**.  
It displays a list of users with pagination, filtering, and edit functionality.

The reason for choosing Next.js is because I've started to learn Next.js since a while and I thought it would be a great way to learn and apply through a real-world project/task.

---

## Deployed Link - https://github.com/champati-v/Inkle-Assignment-Vibekananda-Champati

## 1. Setup Instructions (Run Locally)

### Steps
```bash
# Clone the repository
git clone https://github.com/champati-v/Inkle-Assignment-Vibekananda-Champati.git

# Navigate to the project folder
cd <project-folder>

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 2. Approach
Since I am new to tanstack, I started by first building a basic table using TanStack Table with pagination following documentation and videos.

Once the table was functional, I started working on the actual task step by step.

- I focused on keeping components reusable like CountryFilter, pagination, EditModal etc

- Editing a user updates the data locally instead of refetching the entire table.

- Pagination, filters are handled using TanStack Table APIs.

I tried to keep the UI clean and close to a real dashboard.

## 3. Challenges
### Pagination resetting after editing.
- After editing, the table was going back to page 1. This issue was solved by disabling autoResetPageIndex in TanStack Table. 

### Unnecessary API calls
- To avoid Unnecessary API calls, Countries are fetched once and stored in context, then used across all components. 

### Many UI jitters while changing pages and applying filters
- Solved them by adding animations from autoAninmate from formik. That created smooth effects while table layout changes.

## 4. AI Tools used: 
- ChatGPT and Copilot for code snippets, debugging and UI fixes.

## 5. Learnings
- Building tables using tanstack.
- Structuring components for reusability and handling of data across components.
- Handling UI state and avoiding re-renders
- Improving UX with small details
