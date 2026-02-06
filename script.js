// Sample problem data
const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "easy",
        description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
        <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
        <p>You can return the answer in any order.</p>
        
        <h3>Example 1:</h3>
        <pre>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</pre>
        
        <h3>Constraints:</h3>
        <ul>
            <li>2 <= nums.length <= 10<sup>4</sup></li>
            <li>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></li>
            <li>-10<sup>9</sup> <= target <= 10<sup>9</sup></li>
            <li><strong>Only one valid answer exists.</strong></li>
        </ul>`,
        testCases: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]"
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]"
            }
        ],
        defaultCode: {
            javascript: `function twoSum(nums, target) {
    // Your code here
};`
        }
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "medium",
        description: `<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p>
        <p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>
        
        <h3>Example 1:</h3>
        <pre>Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.</pre>`,
        testCases: [
            {
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]"
            },
            {
                input: "l1 = [0], l2 = [0]",
                output: "[0]"
            },
            {
                input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
                output: "[8,9,9,9,0,0,0,1]"
            }
        ],
        defaultCode: {
            javascript: `function addTwoNumbers(l1, l2) {
    // Your code here
};`
        }
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "medium",
        description: `<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
        
        <h3>Example 1:</h3>
        <pre>Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.</pre>`,
        testCases: [
            {
                input: 's = "abcabcbb"',
                output: "3"
            },
            {
                input: 's = "bbbbb"',
                output: "1"
            },
            {
                input: 's = "pwwkew"',
                output: "3"
            }
        ],
        defaultCode: {
            javascript: `function lengthOfLongestSubstring(s) {
    // Your code here
};`
        }
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "hard",
        description: `<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>
        <p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>
        
        <h3>Example 1:</h3>
        <pre>Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.</pre>`,
        testCases: [
            {
                input: "nums1 = [1,3], nums2 = [2]",
                output: "2.00000"
            },
            {
                input: "nums1 = [1,2], nums2 = [3,4]",
                output: "2.50000"
            }
        ],
        defaultCode: {
            javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Your code here
};`
        }
    }
];

// DOM Elements
const problemListEl = document.getElementById('problem-list');
const problemTitleEl = document.getElementById('problem-title');
const problemDescriptionEl = document.getElementById('problem-description');
const difficultyFilterEl = document.getElementById('difficulty-filter');
const editorEl = document.getElementById('editor');
const languageSelectEl = document.getElementById('language-select');
const testCasesEl = document.getElementById('test-cases');
const runCodeBtn = document.querySelector('.btn.run-code');
const submitCodeBtn = document.querySelector('.btn.submit-code');
const resetCodeBtn = document.querySelector('.btn.reset-code');

// Current state
let currentProblemId = 1;
let currentLanguage = 'javascript';

// Initialize the app
function init() {
    renderProblemList();
    loadProblem(currentProblemId);
    setupEventListeners();
}

// Render problem list
function renderProblemList() {
    const difficultyFilter = difficultyFilterEl.value;
    
    const filteredProblems = difficultyFilter === 'all' 
        ? problems 
        : problems.filter(problem => problem.difficulty === difficultyFilter);
    
    problemListEl.innerHTML = '';
    
    filteredProblems.forEach(problem => {
        const problemItem = document.createElement('div');
        problemItem.className = `problem-item ${problem.id === currentProblemId ? 'active' : ''}`;
        problemItem.innerHTML = `
            <span>${problem.id}. ${problem.title}</span>
            <span class="difficulty ${problem.difficulty}">${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</span>
        `;
        problemItem.addEventListener('click', () => loadProblem(problem.id));
        problemListEl.appendChild(problemItem);
    });
}

// Load problem by ID
function loadProblem(problemId) {
    currentProblemId = problemId;
    const problem = problems.find(p => p.id === problemId);
    
    if (!problem) return;
    
    // Update UI
    problemTitleEl.textContent = problem.title;
    problemDescriptionEl.innerHTML = problem.description;
    
    // Update difficulty badge
    const difficultyBadge = document.querySelector('.difficulty');
    difficultyBadge.className = `difficulty ${problem.difficulty}`;
    difficultyBadge.textContent = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1);
    
    // Update editor with default code
    editorEl.value = problem.defaultCode[currentLanguage] || problem.defaultCode.javascript;
    
    // Render test cases
    renderTestCases(problem.testCases);
    
    // Update active problem in list
    document.querySelectorAll('.problem-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.textContent.split('.')[0]) === problemId) {
            item.classList.add('active');
        }
    });
}

// Render test cases
function renderTestCases(testCases) {
    testCasesEl.innerHTML = '';
    
    testCases.forEach((testCase, index) => {
        const testCaseEl = document.createElement('div');
        testCaseEl.className = 'test-case-item';
        testCaseEl.innerHTML = `
            <div class="test-case-header">
                <span>Test Case ${index + 1}</span>
                <span class="test-case-status">Not Run</span>
            </div>
            <div class="test-case-content">
                <div><strong>Input:</strong> ${testCase.input}</div>
                <div><strong>Expected Output:</strong> ${testCase.output}</div>
            </div>
        `;
        testCasesEl.appendChild(testCaseEl);
    });
}

// Run code
function runCode() {
    const code = editorEl.value;
    const problem = problems.find(p => p.id === currentProblemId);
    
    try {
        // This is a simplified evaluation - in a real app, you'd need a more secure way to execute user code
        const func = new Function(`return ${code}`)();
        
        problem.testCases.forEach((testCase, index) => {
            const testCaseEl = testCasesEl.children[index];
            const statusEl = testCaseEl.querySelector('.test-case-status');
            
            try {
                // Extract input from test case (this is simplified)
                const args = parseTestCaseInput(testCase.input);
                
                // Execute the function with the test case input
                const result = func(...args);
                
                // Compare the result with expected output (simplified comparison)
                if (JSON.stringify(result) === testCase.output) {
                    statusEl.textContent = 'Success';
                    statusEl.className = 'test-case-status success';
                } else {
                    statusEl.textContent = 'Wrong Answer';
                    statusEl.className = 'test-case-status error';
                }
            } catch (error) {
                statusEl.textContent = 'Runtime Error';
                statusEl.className = 'test-case-status error';
                console.error(error);
            }
        });
    } catch (error) {
        alert(`Compilation Error: ${error.message}`);
        console.error(error);
    }
}

// Simplified input parser - in a real app, you'd need a more robust parser
function parseTestCaseInput(inputStr) {
    // This is a very simplified parser for demonstration
    // In a real app, you'd need proper parsing based on the problem's input format
    
    if (inputStr.includes('nums =') && inputStr.includes('target =')) {
        // For Two Sum problem
        const numsMatch = inputStr.match(/nums = (\[.*?\])/);
        const targetMatch = inputStr.match(/target = (\d+)/);
        
        if (numsMatch && targetMatch) {
            const nums = JSON.parse(numsMatch[1]);
            const target = parseInt(targetMatch[1]);
            return [nums, target];
        }
    } else if (inputStr.includes('s =')) {
        // For string problems
        const strMatch = inputStr.match(/s = "(.*?)"/);
        if (strMatch) {
            return [strMatch[1]];
        }
    }
    
    // Default fallback (not robust)
    try {
        return JSON.parse(`[${inputStr.split('=')[1].trim()}]`);
    } catch {
        return [];
    }
}

// Submit code (similar to run but with more comprehensive testing)
function submitCode() {
    runCode(); // For this demo, submit is same as run
    alert('Submission complete! In a real app, this would send to a server for evaluation.');
}

// Reset code to default
function resetCode() {
    const problem = problems.find(p => p.id === currentProblemId);
    editorEl.value = problem.defaultCode[currentLanguage] || problem.defaultCode.javascript;
}

// Set up event listeners
function setupEventListeners() {
    // Filter problems by difficulty
    difficultyFilterEl.addEventListener('change', renderProblemList);
    
    // Run code
    runCodeBtn.addEventListener('click', runCode);
    
    // Submit code
    submitCodeBtn.addEventListener('click', submitCode);
    
    // Reset code
    resetCodeBtn.addEventListener('click', resetCode);
    
    // Change language
    languageSelectEl.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        resetCode();
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);