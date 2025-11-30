<h1><img src="./mindroute-ui/public/MindRoute.svg" width="55rem" height="55rem" valign="middle"/> MindRoute - Organize Today. Conquer Tomorrow.</h1>

<h2>MindRoute - Organize Today. Conquer Tomorrow.</h2>
<h3>A smart task management app that empowers you to organize, track, and complete your tasks effortlessly.<br/>
It stores tasks as connected nodes and relationships inside a graph structure, enabling better organization and future graph-based insights. MindRoute is built using React, Redux, TypeScript, Node.js, Express, and Neo4j (Graph Database).</h3>

<h3><a href="https://mindroute.vercel.app">🌍 Live Demo: https://mindroute.vercel.app</a></h3>
<h3><a href="https://mindroute.onrender.com">🛠 Backend API: https: //mindroute.onrender.com</a></h3>

<h2>Features</23>
<h4>
<ul>
<li>Add, mark as done & delete tasks</li>
<li>Real-time state updates using Redux Toolkit</li>
<li>Unique user tracking (without login / no login required)</li>
<li>Graph Database storage with Neo4j AuraDB</li>
<li>Fully TypeScript across frontend + backend</li>
<li>Secure API communication</li>
<li>TailwindCSS modern & clean UI/UX</li>
<li>Custom hooks for Redux integration</li>
<li>Fully responsive & mobile-friendly</li>
</ul>
</h4>

<h2>Tech Stack / Technologies Used</h2>
<h4>&rarr; Frontend: React, TypeScript, Redux, Redux Toolkit, React-Redux, Vite, Axios, TailwindCSS, React Hot Toast, React Icons, JavaScript, CSS3, HTML5<br/>
&rarr; Backend: Node.js, Express.js, TypeScript, Neo4j Driver, CORS, dotenv, ts-node, nodemon</br>
&rarr; Database: Neo4j AuraDB (Cloud Graph Database), Neo4j (Graph Database)</br>
&rarr; Deployment: Render (Backend), Vercel (Frontend)</h4>

<h2>Graph Database - Neo4j AuraDB Overview</h2>
<h4>MindRoute stores both users and tasks as nodes and connects them using relationships. This graph-based structure enables smarter querying, better organization, and future analytics opportunities.</h4>

<h2>Installation & Setup</h2>
<h4>1. Clone the Repository</h4>
<pre>
<code>
git clone https://github.com/OmkarArdekar12/MindRoute.git
cd MindRoute
</code>
</pre>
<h4>2. Environment Variables Setup</h4>
<p>- Create .env file in ./mindroute-api</p>
<pre>
<code>
PORT=5000
NEO4J_URI=<your-db-uri>
NEO4J_USER=<your-db-user>
NEO4J_PASSWORD=<your-db-password>
FRONTEND_URL=http://localhost:3000
</code>
</pre>
<p>- Create .env file in ./mindroute-ui</p>
<pre>
<code>
VITE_BACKEND_URL=http://localhost:5000
</code>
</pre>
<h4>3. Setup Backend</h4>
<pre>
<code>
cd mindroute-api
npm install
npm run dev
</code>
</pre>
<h4>4. Setup Frontend</h4>
<pre>
<code>
cd mindroute-ui
npm i
npm run dev
</code>
</pre>
