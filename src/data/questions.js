// NEB Class 12 Computer Science - Question Bank Data
// Based on NEB past papers 2078–2082 BS

export const CHAPTERS = [
  { id: 1, name: "DBMS Concepts", short: "DBMS", color: "#6C63FF", icon: "🗄️", questionCount: 14 },
  { id: 2, name: "Network & Data Communication", short: "Networks", color: "#FF6584", icon: "🌐", questionCount: 10 },
  { id: 3, name: "Web Technology II", short: "Web Tech", color: "#43C59E", icon: "💻", questionCount: 14 },
  { id: 4, name: "Programming II (C)", short: "Programming", color: "#FFB347", icon: "⚙️", questionCount: 22 },
  { id: 5, name: "OOP Concepts", short: "OOP", color: "#FF6B9D", icon: "🧩", questionCount: 7 },
  { id: 6, name: "Software Process (SDLC)", short: "SDLC", color: "#45B7D1", icon: "📊", questionCount: 9 },
  { id: 7, name: "Recent Trends in ICT", short: "ICT Trends", color: "#98D8C8", icon: "🚀", questionCount: 13 },
];

export const QUESTIONS = [
  // ─── CHAPTER 1: DBMS ───────────────────────────────────────────────
  {
    id: "q001",
    chapterId: 1,
    topic: "Database Fundamentals",
    subtopic: "Keys",
    year: 2079,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Define primary key, foreign key, and candidate key with examples.",
    answer: `**Primary Key**: A column (or combination) that uniquely identifies each row in a table. Example: \`StudentID\` in a Students table.

**Foreign Key**: A column in one table that references the primary key of another table, creating a relationship. Example: \`CourseID\` in Enrollment table referencing Courses table.

**Candidate Key**: Any column or set of columns that could serve as the primary key (minimal superkey). Example: Both \`StudentID\` and \`Email\` can uniquely identify students — both are candidate keys.`,
    tags: ["keys", "primary-key", "foreign-key", "candidate-key", "relational-database"],
  },
  {
    id: "q002",
    chapterId: 1,
    topic: "Normalization",
    subtopic: "Normal Forms",
    year: 2082,
    type: "long",
    marks: 8,
    difficulty: "hard",
    question: "Define normalization. Explain 1NF, 2NF, and 3NF with examples.",
    answer: `**Normalization** is the process of organizing database tables to reduce data redundancy and improve data integrity.

**1NF (First Normal Form)**:
- Each column must contain atomic (indivisible) values
- No repeating groups
- Example: Split \`Phone1, Phone2\` into a separate Phones table

**2NF (Second Normal Form)**:
- Must be in 1NF
- No partial dependency (every non-key attribute depends on the WHOLE primary key)
- Example: If key is (StudentID, CourseID), then \`StudentName\` depends only on StudentID — move it out

**3NF (Third Normal Form)**:
- Must be in 2NF
- No transitive dependency (non-key attributes must not depend on other non-key attributes)
- Example: If \`Zip → City\`, and \`Zip\` is not a key, move City+Zip to a separate table`,
    tags: ["normalization", "1NF", "2NF", "3NF", "database-design"],
  },
  {
    id: "q003",
    chapterId: 1,
    topic: "SQL",
    subtopic: "DDL vs DML",
    year: 2079,
    type: "mcq",
    marks: 1,
    difficulty: "easy",
    question: "Which SQL command is used to delete all rows from a table without deleting the table structure?",
    options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
    correctOption: 2,
    answer: `**TRUNCATE** removes all rows from a table but keeps the table structure intact. It is faster than DELETE because it doesn't log individual row deletions.

- **DROP** removes the entire table (structure + data)
- **DELETE** removes rows (with optional WHERE clause) and logs each deletion
- **TRUNCATE** removes all rows quickly, cannot use WHERE, resets auto-increment`,
    tags: ["SQL", "DDL", "DML", "TRUNCATE", "DELETE"],
  },
  {
    id: "q004",
    chapterId: 1,
    topic: "SQL",
    subtopic: "Queries",
    year: 2081,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Write SQL queries to: (a) Create a table 'Employee' with EmpID, Name, Salary, Dept. (b) Insert 2 records. (c) Display employees with Salary > 30000.",
    answer: `\`\`\`sql
-- (a) Create table
CREATE TABLE Employee (
    EmpID   INT PRIMARY KEY,
    Name    VARCHAR(50) NOT NULL,
    Salary  DECIMAL(10,2),
    Dept    VARCHAR(30)
);

-- (b) Insert records
INSERT INTO Employee VALUES (1, 'Ram Sharma', 45000, 'IT');
INSERT INTO Employee VALUES (2, 'Sita Rai', 28000, 'HR');

-- (c) Display employees with Salary > 30000
SELECT * FROM Employee WHERE Salary > 30000;
\`\`\``,
    tags: ["SQL", "CREATE", "INSERT", "SELECT", "WHERE"],
    isCode: true,
    language: "sql",
  },
  {
    id: "q005",
    chapterId: 1,
    topic: "Database Architecture",
    subtopic: "Centralized vs Distributed",
    year: 2079,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Differentiate between centralized and distributed databases.",
    answer: `| Feature | Centralized DB | Distributed DB |
|---------|---------------|----------------|
| Location | Single location | Multiple locations |
| Management | Easier to manage | Complex management |
| Performance | Single point of failure | Higher availability |
| Cost | Lower setup cost | Higher setup cost |
| Access Speed | Slower for remote users | Faster for local access |
| Security | Easier to secure | More complex security |
| Example | Small office DB | Banking systems, Google |`,
    tags: ["centralized", "distributed", "database", "architecture"],
  },

  // ─── CHAPTER 2: NETWORKS ───────────────────────────────────────────
  {
    id: "q006",
    chapterId: 2,
    topic: "OSI Model",
    subtopic: "Layers",
    year: 2080,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Explain the OSI model layers with their functions.",
    answer: `The **OSI (Open Systems Interconnection)** model has 7 layers:

| Layer | Name | Function |
|-------|------|----------|
| 7 | **Application** | User interface, HTTP, FTP, SMTP |
| 6 | **Presentation** | Data formatting, encryption, compression |
| 5 | **Session** | Manages sessions/connections between apps |
| 4 | **Transport** | End-to-end communication, TCP/UDP |
| 3 | **Network** | Routing, IP addressing |
| 2 | **Data Link** | Frame creation, MAC addressing, error detection |
| 1 | **Physical** | Bit transmission over physical media |

**Mnemonic**: "All People Seem To Need Data Processing"`,
    tags: ["OSI", "layers", "networking", "protocol"],
  },
  {
    id: "q007",
    chapterId: 2,
    topic: "IP Addressing",
    subtopic: "Classes",
    year: 2079,
    type: "mcq",
    marks: 1,
    difficulty: "easy",
    question: "Which IP address class supports the maximum number of hosts per network?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctOption: 0,
    answer: `**Class A** supports the most hosts per network.

- **Class A**: Range 1–126, Subnet /8, up to **16,777,214 hosts** per network
- **Class B**: Range 128–191, Subnet /16, up to 65,534 hosts
- **Class C**: Range 192–223, Subnet /24, up to 254 hosts
- **Class D**: Reserved for multicast (no host assignments)`,
    tags: ["IP", "addressing", "Class-A", "subnet", "networking"],
  },
  {
    id: "q008",
    chapterId: 2,
    topic: "Network Topologies",
    subtopic: "Types",
    year: 2081,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Describe star and bus topologies with advantages and disadvantages.",
    answer: `**Star Topology**:
- All devices connect to a central hub/switch
- ✅ Easy to add/remove devices, failure isolated to one node
- ❌ Hub failure brings down entire network, expensive

**Bus Topology**:
- All devices share a single communication line (backbone)
- ✅ Simple, inexpensive, easy to install
- ❌ Cable failure disrupts entire network, performance degrades with more devices

**Comparison**: Star is more reliable and commonly used today (Ethernet LANs). Bus was common in older networks (coaxial cable).`,
    tags: ["topology", "star", "bus", "network", "LAN"],
  },

  // ─── CHAPTER 3: WEB TECHNOLOGY II ─────────────────────────────────
  {
    id: "q009",
    chapterId: 3,
    topic: "JavaScript",
    subtopic: "Functions",
    year: 2081,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Write a JavaScript function to check if a number is even or odd.",
    answer: `\`\`\`javascript
function checkEvenOdd(num) {
    if (num % 2 === 0) {
        return num + " is Even";
    } else {
        return num + " is Odd";
    }
}

// Example usage
console.log(checkEvenOdd(10));  // Output: 10 is Even
console.log(checkEvenOdd(7));   // Output: 7 is Odd

// Arrow function version (ES6)
const isEvenOdd = (n) => n % 2 === 0 ? "Even" : "Odd";
\`\`\``,
    tags: ["JavaScript", "function", "even-odd", "conditional"],
    isCode: true,
    language: "javascript",
  },
  {
    id: "q010",
    chapterId: 3,
    topic: "PHP",
    subtopic: "Form Handling",
    year: 2082,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Write a PHP script to accept a name via GET method and display 'Hello, [Name]!'",
    answer: `\`\`\`php
<?php
// HTML Form
?>
<!DOCTYPE html>
<html>
<body>
  <form method="GET" action="">
    <input type="text" name="username" placeholder="Enter your name">
    <button type="submit">Greet</button>
  </form>
  
<?php
if (isset($_GET['username']) && !empty($_GET['username'])) {
    $name = htmlspecialchars($_GET['username']); // Sanitize input
    echo "<h2>Hello, " . $name . "!</h2>";
}
?>
</body>
</html>
\`\`\``,
    tags: ["PHP", "GET", "form", "web", "server-side"],
    isCode: true,
    language: "php",
  },
  {
    id: "q011",
    chapterId: 3,
    topic: "jQuery",
    subtopic: "Selectors",
    year: 2079,
    type: "mcq",
    marks: 1,
    difficulty: "easy",
    question: "Which jQuery selector selects all elements with class 'myClass'?",
    options: ["$('#myClass')", "$('.myClass')", "$('myClass')", "$('*myClass')"],
    correctOption: 1,
    answer: `**$('.myClass')** selects all elements with class \`myClass\`.

jQuery CSS Selectors:
- \`$('#id')\` — select by **ID**
- \`$('.class')\` — select by **class**
- \`$('tag')\` — select by **HTML tag**
- \`$('*')\` — select **all** elements`,
    tags: ["jQuery", "selector", "class", "DOM"],
  },
  {
    id: "q012",
    chapterId: 3,
    topic: "HTML/CSS",
    subtopic: "Responsive Design",
    year: 2080,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "What is responsive web design? Write CSS media query for screens below 768px.",
    answer: `**Responsive Web Design** is an approach where web pages adapt their layout and content based on the user's screen size/device, providing optimal viewing on all devices.

**Key techniques**: Flexible grids, fluid images, CSS Media Queries.

\`\`\`css
/* Default (desktop) styles */
.container {
    width: 1200px;
    display: flex;
}

/* Tablet and below (768px) */
@media (max-width: 768px) {
    .container {
        width: 100%;
        flex-direction: column;
    }
    
    .sidebar {
        display: none;
    }
    
    font-size: 14px;
}
\`\`\``,
    tags: ["responsive", "media-query", "CSS", "mobile-first"],
    isCode: true,
    language: "css",
  },

  // ─── CHAPTER 4: PROGRAMMING II (C) ────────────────────────────────
  {
    id: "q013",
    chapterId: 4,
    topic: "Loops",
    subtopic: "For Loop",
    year: 2078,
    type: "long",
    marks: 10,
    difficulty: "easy",
    question: "Write a C program to print the multiplication table of a given number using a for loop.",
    answer: `\`\`\`c
#include <stdio.h>

int main() {
    int num, i;
    
    printf("Enter a number: ");
    scanf("%d", &num);
    
    printf("\\nMultiplication Table of %d:\\n", num);
    printf("==========================\\n");
    
    for (i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", num, i, num * i);
    }
    
    return 0;
}
\`\`\`

**Sample Output** (for num = 5):
\`\`\`
5 x 1  = 5
5 x 2  = 10
...
5 x 10 = 50
\`\`\``,
    tags: ["C", "loop", "for-loop", "multiplication-table"],
    isCode: true,
    language: "c",
  },
  {
    id: "q014",
    chapterId: 4,
    topic: "Arrays",
    subtopic: "Sorting",
    year: 2078,
    type: "long",
    marks: 10,
    difficulty: "medium",
    question: "Write a C program to sort an array of n integers in ascending order using bubble sort.",
    answer: `\`\`\`c
#include <stdio.h>

int main() {
    int arr[100], n, i, j, temp;
    
    printf("Enter number of elements: ");
    scanf("%d", &n);
    
    printf("Enter %d integers:\\n", n);
    for (i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    // Bubble Sort algorithm
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    printf("\\nSorted Array (Ascending): ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}
\`\`\`

**Time Complexity**: O(n²) — best case O(n) if array is already sorted.`,
    tags: ["C", "array", "bubble-sort", "sorting", "algorithm"],
    isCode: true,
    language: "c",
  },
  {
    id: "q015",
    chapterId: 4,
    topic: "Pointers",
    subtopic: "Basic Pointers",
    year: 2078,
    type: "long",
    marks: 10,
    difficulty: "hard",
    question: "Explain pointers in C. Write a program to swap two numbers using pointers.",
    answer: `**Pointer**: A variable that stores the memory address of another variable.

**Key operators**:
- \`&\` — Address-of operator (gets address of variable)
- \`*\` — Dereference operator (gets value at address)

\`\`\`c
#include <stdio.h>

// Function to swap using pointers
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x, y;
    
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    
    printf("Before swap: x = %d, y = %d\\n", x, y);
    
    swap(&x, &y);  // Pass addresses
    
    printf("After swap:  x = %d, y = %d\\n", x, y);
    
    return 0;
}
\`\`\`

**How it works**: We pass the addresses of x and y. Inside swap(), \`*a\` and \`*b\` directly modify the original variables.`,
    tags: ["C", "pointers", "swap", "memory", "address"],
    isCode: true,
    language: "c",
  },
  {
    id: "q016",
    chapterId: 4,
    topic: "Functions",
    subtopic: "Recursion",
    year: 2079,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Write a C function to calculate factorial of n using recursion.",
    answer: `\`\`\`c
#include <stdio.h>

// Recursive factorial function
long long factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;  // Base case
    }
    return n * factorial(n - 1);  // Recursive call
}

int main() {
    int num;
    printf("Enter a positive integer: ");
    scanf("%d", &num);
    
    if (num < 0) {
        printf("Factorial of negative number doesn't exist.\\n");
    } else {
        printf("Factorial of %d = %lld\\n", num, factorial(num));
    }
    return 0;
}
\`\`\`

**Recursion trace for factorial(4)**:
\`factorial(4) → 4 × factorial(3) → 4×3×2×1 = 24\``,
    tags: ["C", "recursion", "factorial", "function"],
    isCode: true,
    language: "c",
  },
  {
    id: "q017",
    chapterId: 4,
    topic: "Structures",
    subtopic: "File I/O",
    year: 2080,
    type: "long",
    marks: 8,
    difficulty: "hard",
    question: "Write a C program using struct to store staff details (ID, Name, Salary) and display staff with salary > 40000.",
    answer: `\`\`\`c
#include <stdio.h>
#include <string.h>

struct Staff {
    int id;
    char name[50];
    float salary;
};

int main() {
    int n, i;
    
    printf("Enter number of staff: ");
    scanf("%d", &n);
    
    struct Staff staff[n];
    
    // Input staff details
    for (i = 0; i < n; i++) {
        printf("\\nStaff %d:\\n", i + 1);
        printf("  ID: ");     scanf("%d", &staff[i].id);
        printf("  Name: ");   scanf("%s", staff[i].name);
        printf("  Salary: "); scanf("%f", &staff[i].salary);
    }
    
    // Display staff with salary > 40000
    printf("\\n--- Staff with Salary > 40,000 ---\\n");
    printf("%-5s %-20s %-10s\\n", "ID", "Name", "Salary");
    printf("----------------------------------------\\n");
    
    for (i = 0; i < n; i++) {
        if (staff[i].salary > 40000) {
            printf("%-5d %-20s %.2f\\n", 
                   staff[i].id, staff[i].name, staff[i].salary);
        }
    }
    
    return 0;
}
\`\`\``,
    tags: ["C", "struct", "structure", "salary", "filter"],
    isCode: true,
    language: "c",
  },
  {
    id: "q018",
    chapterId: 4,
    topic: "Switch Statement",
    subtopic: "Control Flow",
    year: 2078,
    type: "short",
    marks: 5,
    difficulty: "easy",
    question: "Describe the C switch statement with an example.",
    answer: `**Switch statement**: A multi-way branching statement that evaluates an expression and executes the matching case.

**Syntax**:
\`\`\`c
switch (expression) {
    case value1:
        // statements
        break;
    case value2:
        // statements
        break;
    default:
        // executed if no case matches
}
\`\`\`

**Example** — Day of week:
\`\`\`c
#include <stdio.h>
int main() {
    int day = 3;
    switch (day) {
        case 1: printf("Monday");    break;
        case 2: printf("Tuesday");   break;
        case 3: printf("Wednesday"); break;
        case 4: printf("Thursday");  break;
        case 5: printf("Friday");    break;
        default: printf("Weekend");
    }
    return 0;
}
\`\`\`
**Output**: \`Wednesday\``,
    tags: ["C", "switch", "control-flow", "branching"],
    isCode: true,
    language: "c",
  },

  // ─── CHAPTER 5: OOP ───────────────────────────────────────────────
  {
    id: "q019",
    chapterId: 5,
    topic: "OOP Principles",
    subtopic: "Four Pillars",
    year: 2081,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Explain the four pillars of Object-Oriented Programming.",
    answer: `**1. Encapsulation**: Bundling data and methods that operate on that data within a single unit (class). Restricts direct access to some components (private members).

**2. Inheritance**: A class (child) can inherit properties and methods from another class (parent). Promotes code reuse.
- Example: \`Dog extends Animal\` — Dog inherits \`eat()\` from Animal

**3. Polymorphism**: Same interface, different implementations. An object can take many forms.
- Method overloading (compile-time)
- Method overriding (runtime)

**4. Abstraction**: Hiding complex implementation details, showing only essential features.
- Abstract classes and interfaces provide abstraction`,
    tags: ["OOP", "encapsulation", "inheritance", "polymorphism", "abstraction"],
  },
  {
    id: "q020",
    chapterId: 5,
    topic: "Classes and Objects",
    subtopic: "Constructor",
    year: 2082,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "What is a constructor? Write a C++ class 'Rectangle' with a constructor and method to calculate area.",
    answer: `**Constructor**: A special method that is automatically called when an object is created. It has the same name as the class and no return type.

\`\`\`cpp
#include <iostream>
using namespace std;

class Rectangle {
private:
    float length, width;

public:
    // Constructor
    Rectangle(float l, float w) {
        length = l;
        width = w;
    }
    
    // Method to calculate area
    float calculateArea() {
        return length * width;
    }
    
    void display() {
        cout << "Length: " << length << ", Width: " << width << endl;
        cout << "Area: " << calculateArea() << endl;
    }
};

int main() {
    Rectangle r1(5.0, 3.0);  // Constructor called
    r1.display();             // Output: Area: 15
    return 0;
}
\`\`\``,
    tags: ["OOP", "constructor", "class", "C++", "Rectangle"],
    isCode: true,
    language: "cpp",
  },

  // ─── CHAPTER 6: SDLC ──────────────────────────────────────────────
  {
    id: "q021",
    chapterId: 6,
    topic: "SDLC Phases",
    subtopic: "Waterfall Model",
    year: 2080,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Explain the phases of the Waterfall Model of software development.",
    answer: `The **Waterfall Model** is a sequential (linear) software development process:

**1. Requirements Analysis**
- Gather and document all requirements
- Output: Requirements Specification Document

**2. System Design**
- Convert requirements into system architecture
- Output: Design Document (HLD/LLD)

**3. Implementation (Coding)**
- Developers write the actual code
- Output: Source code

**4. Testing**
- Test software for bugs and verify requirements
- Output: Test reports, bug fixes

**5. Deployment**
- Release software to end users
- Output: Deployed system

**6. Maintenance**
- Fix bugs, add features after deployment

**Advantage**: Simple, clear phases
**Disadvantage**: Inflexible — hard to go back to previous phases`,
    tags: ["SDLC", "waterfall", "phases", "software-development"],
  },
  {
    id: "q022",
    chapterId: 6,
    topic: "SDLC Models",
    subtopic: "Agile vs Waterfall",
    year: 2082,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Compare Agile and Waterfall software development models.",
    answer: `| Feature | Waterfall | Agile |
|---------|-----------|-------|
| Approach | Sequential/Linear | Iterative/Incremental |
| Flexibility | Rigid — hard to change | Flexible — adapts to change |
| Customer Involvement | Only at start/end | Continuous involvement |
| Testing | At end of project | Continuous testing |
| Documentation | Heavy documentation | Minimal documentation |
| Delivery | Single delivery at end | Frequent small releases |
| Best For | Fixed requirements | Evolving requirements |
| Risk | High (discovered late) | Low (caught early) |

**Agile frameworks**: Scrum, Kanban, XP (Extreme Programming)`,
    tags: ["SDLC", "agile", "waterfall", "comparison", "scrum"],
  },

  // ─── CHAPTER 7: ICT TRENDS ────────────────────────────────────────
  {
    id: "q023",
    chapterId: 7,
    topic: "Artificial Intelligence",
    subtopic: "Applications",
    year: 2081,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "What is Artificial Intelligence? Describe five real-life applications of AI.",
    answer: `**Artificial Intelligence (AI)** is the simulation of human intelligence processes by machines, especially computer systems. It includes learning, reasoning, and self-correction.

**5 Real-life Applications**:

1. **Virtual Assistants**: Siri, Alexa, Google Assistant — natural language processing to answer queries

2. **Healthcare**: AI diagnoses diseases from X-rays/MRIs, drug discovery (AlphaFold for protein structure)

3. **Autonomous Vehicles**: Self-driving cars (Tesla, Waymo) use AI for navigation and obstacle detection

4. **Recommendation Systems**: Netflix, YouTube, Spotify suggest content based on user behavior

5. **Fraud Detection**: Banks use AI to detect unusual transaction patterns in real-time`,
    tags: ["AI", "artificial-intelligence", "machine-learning", "applications", "ICT"],
  },
  {
    id: "q024",
    chapterId: 7,
    topic: "Cloud Computing",
    subtopic: "Service Models",
    year: 2080,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Explain IaaS, PaaS, and SaaS with examples.",
    answer: `**Cloud Computing Service Models**:

**IaaS (Infrastructure as a Service)**:
- Provides virtualized computing infrastructure over the internet
- User manages: OS, middleware, runtime, data, applications
- Examples: **AWS EC2**, Microsoft Azure VMs, Google Compute Engine

**PaaS (Platform as a Service)**:
- Provides hardware and software tools over the internet (development platform)
- User manages: Applications and data only
- Examples: **Heroku**, Google App Engine, AWS Elastic Beanstalk

**SaaS (Software as a Service)**:
- Provides complete software applications over the internet
- User manages: Nothing (just uses the software)
- Examples: **Gmail**, Microsoft Office 365, Salesforce, Zoom

**Memory trick**: IaaS (I rent the infrastructure), PaaS (Platform to build on), SaaS (Software ready to use)`,
    tags: ["cloud", "IaaS", "PaaS", "SaaS", "AWS", "service-model"],
  },
  {
    id: "q025",
    chapterId: 7,
    topic: "IoT",
    subtopic: "Internet of Things",
    year: 2082,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Define IoT. Describe its applications and challenges.",
    answer: `**IoT (Internet of Things)**: A network of physical devices (things) embedded with sensors, software, and connectivity to collect and exchange data over the internet.

**Applications**:
- **Smart Home**: Smart bulbs, thermostats (Google Nest), security cameras
- **Healthcare**: Wearable fitness trackers (Fitbit), remote patient monitoring
- **Agriculture**: Smart irrigation systems, soil moisture sensors
- **Smart Cities**: Traffic management, waste management, smart street lights
- **Manufacturing**: Predictive maintenance of machinery (Industry 4.0)

**Challenges**:
- **Security**: IoT devices are vulnerable to hacking
- **Privacy**: Massive data collection raises privacy concerns
- **Interoperability**: Devices from different manufacturers may not work together
- **Power**: Battery life limitations for small devices
- **Scalability**: Managing billions of connected devices`,
    tags: ["IoT", "internet-of-things", "smart-home", "sensors", "connectivity"],
  },
  {
    id: "q026",
    chapterId: 7,
    topic: "Cybersecurity",
    subtopic: "Threats and Protection",
    year: 2079,
    type: "mcq",
    marks: 1,
    difficulty: "easy",
    question: "Which of the following is NOT a type of malware?",
    options: ["Virus", "Trojan Horse", "Firewall", "Ransomware"],
    correctOption: 2,
    answer: `**Firewall** is NOT malware — it is a security system that monitors and controls network traffic.

**Types of Malware**:
- **Virus**: Self-replicating program that attaches to legitimate files
- **Trojan Horse**: Disguises as legitimate software but performs malicious actions
- **Ransomware**: Encrypts victim's files and demands payment (e.g., WannaCry)
- **Spyware**: Secretly monitors user activity
- **Worm**: Self-replicating, spreads across networks without user action`,
    tags: ["cybersecurity", "malware", "virus", "firewall", "ransomware"],
  },

  // More C Programming questions (Chapter 4 is most tested)
  {
    id: "q027",
    chapterId: 4,
    topic: "File Handling",
    subtopic: "Read and Write",
    year: 2081,
    type: "long",
    marks: 8,
    difficulty: "hard",
    question: "Write a C program to write student name and marks to a file, then read and display them.",
    answer: `\`\`\`c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int marks;
};

int main() {
    FILE *fp;
    struct Student s;
    int n, i;
    
    printf("Enter number of students: ");
    scanf("%d", &n);
    
    // Write to file
    fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    
    for (i = 0; i < n; i++) {
        printf("\\nStudent %d Name: ", i + 1);
        scanf("%s", s.name);
        printf("Marks: ");
        scanf("%d", &s.marks);
        fprintf(fp, "%s %d\\n", s.name, s.marks);
    }
    fclose(fp);
    
    // Read from file and display
    printf("\\n--- Student Records ---\\n");
    fp = fopen("students.txt", "r");
    while (fscanf(fp, "%s %d", s.name, &s.marks) != EOF) {
        printf("Name: %-15s Marks: %d\\n", s.name, s.marks);
    }
    fclose(fp);
    
    return 0;
}
\`\`\``,
    tags: ["C", "file-handling", "FILE", "fopen", "fprintf", "fscanf"],
    isCode: true,
    language: "c",
  },
  {
    id: "q028",
    chapterId: 4,
    topic: "Strings",
    subtopic: "String Functions",
    year: 2080,
    type: "short",
    marks: 5,
    difficulty: "easy",
    question: "Write a C program to find the length and reverse of a string without using library functions.",
    answer: `\`\`\`c
#include <stdio.h>

int main() {
    char str[100], rev[100];
    int len = 0, i;
    
    printf("Enter a string: ");
    scanf("%s", str);
    
    // Find length without strlen()
    while (str[len] != '\\0') {
        len++;
    }
    printf("Length: %d\\n", len);
    
    // Reverse the string
    for (i = 0; i < len; i++) {
        rev[i] = str[len - 1 - i];
    }
    rev[len] = '\\0';
    
    printf("Reversed: %s\\n", rev);
    
    return 0;
}
\`\`\``,
    tags: ["C", "string", "reverse", "length", "array"],
    isCode: true,
    language: "c",
  },
  {
    id: "q029",
    chapterId: 1,
    topic: "SQL",
    subtopic: "Joins",
    year: 2082,
    type: "short",
    marks: 5,
    difficulty: "hard",
    question: "Explain SQL JOINs with examples: INNER JOIN, LEFT JOIN, and RIGHT JOIN.",
    answer: `**SQL JOINs** combine rows from two or more tables based on a related column.

Assume:
- **Students**: (StudentID, Name, DeptID)
- **Departments**: (DeptID, DeptName)

**INNER JOIN** — Returns rows with matching values in both tables:
\`\`\`sql
SELECT Students.Name, Departments.DeptName
FROM Students
INNER JOIN Departments ON Students.DeptID = Departments.DeptID;
\`\`\`
*Returns only students who have a matching department.*

**LEFT JOIN** — Returns all rows from left table, matched from right:
\`\`\`sql
SELECT Students.Name, Departments.DeptName
FROM Students
LEFT JOIN Departments ON Students.DeptID = Departments.DeptID;
\`\`\`
*Returns all students, even if they have no department (NULL).*

**RIGHT JOIN** — Returns all rows from right table, matched from left:
\`\`\`sql
SELECT Students.Name, Departments.DeptName
FROM Students
RIGHT JOIN Departments ON Students.DeptID = Departments.DeptID;
\`\`\`
*Returns all departments, even if no student is enrolled.*`,
    tags: ["SQL", "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"],
    isCode: true,
    language: "sql",
  },
  {
    id: "q030",
    chapterId: 2,
    topic: "Protocols",
    subtopic: "TCP/IP",
    year: 2081,
    type: "short",
    marks: 5,
    difficulty: "medium",
    question: "Explain TCP/IP model layers and compare with OSI model.",
    answer: `**TCP/IP Model** has 4 layers:

| TCP/IP Layer | Protocols | OSI Equivalent |
|-------------|-----------|----------------|
| **Application** | HTTP, FTP, SMTP, DNS, Telnet | Application + Presentation + Session |
| **Transport** | TCP, UDP | Transport |
| **Internet** | IP, ICMP, ARP | Network |
| **Network Access** | Ethernet, Wi-Fi, PPP | Data Link + Physical |

**Key Difference**:
- OSI is a **conceptual model** (7 layers) — reference standard
- TCP/IP is a **practical model** (4 layers) — actual internet implementation

**TCP vs UDP**:
- TCP: Connection-oriented, reliable, ordered (web browsing, email)
- UDP: Connectionless, faster, no guarantee (video streaming, gaming)`,
    tags: ["TCP/IP", "OSI", "protocol", "transport", "networking"],
  },
];

export const STATS = {
  totalQuestions: QUESTIONS.length,
  totalChapters: CHAPTERS.length,
  yearsSpanned: "2078–2082 BS",
  topChapter: "Programming II",
};
