import type { Problem } from '../types'

export const problems: Problem[] = [
  {
    id: 'twosum',
    title: 'Two Sum',
    subtitle: 'Given an array and a target, return indices of two numbers that add up to the target.',
    difficulty: 'easy',
    language: 'csharp',
    sig: 'public int[] TwoSum(int[] nums, int target) {',
    steps: [
      {
        prompt: 'Step 1 — what data structure do we use to track seen numbers?',
        blocks: [
          { code: 'var map = new Dictionary<int, int>();', correct: true },
          { code: 'var list = new List<int>();', correct: false },
          { code: 'int[] result = new int[2];', correct: false },
          { code: 'var set = new HashSet<int>();', correct: false },
        ],
        feedback: {
          correct: 'Dictionary<int, int> stores each number as the key and its index as the value — O(1) lookup, no nested loop needed.',
          wrong: {
            'var list = new List<int>();': 'A List has no fast lookup by value. We need key→value so we can store number + its index.',
            'int[] result = new int[2];': "That's our output, not our helper. We'll return an int[] at the end, but we need a lookup structure first.",
            'var set = new HashSet<int>();': 'Close — HashSet is fast, but we also need to store the index of each number, not just the number itself.',
          }
        },
        snippet: '    var map = new Dictionary<int, int>();'
      },
      {
        prompt: 'Step 2 — how do we loop through the array?',
        blocks: [
          { code: 'for (int i = 0; i < nums.Length; i++)', correct: true },
          { code: 'foreach (var n in nums)', correct: false },
          { code: 'while (nums.Length > 0)', correct: false },
          { code: 'for (int i = 1; i <= nums.Length; i++)', correct: false },
        ],
        feedback: {
          correct: 'Standard for loop with index i — we need the position of each element to return it as part of the answer.',
          wrong: {
            'foreach (var n in nums)': 'foreach loses track of position. We need the index i to return [i, j].',
            'while (nums.Length > 0)': "nums.Length never changes — infinite loop. Use while when iteration count is unknown.",
            'for (int i = 1; i <= nums.Length; i++)': 'Off by one — C# arrays are zero-indexed. Starting at 1 skips nums[0].',
          }
        },
        snippet: '    for (int i = 0; i < nums.Length; i++) {'
      },
      {
        prompt: "Step 3 — find the complement and check if we've seen it",
        blocks: [
          { code: 'int complement = target - nums[i];\nif (map.ContainsKey(complement))', correct: true },
          { code: 'int complement = nums[i] - target;\nif (map.ContainsKey(complement))', correct: false },
          { code: 'if (nums[i] + nums[i-1] == target)', correct: false },
          { code: 'if (map.ContainsKey(nums[i]))', correct: false },
        ],
        feedback: {
          correct: 'complement = target - nums[i] is the number we need. ContainsKey checks the dictionary in O(1).',
          wrong: {
            'int complement = nums[i] - target;\nif (map.ContainsKey(complement))': 'Subtraction is flipped. target=9, nums[i]=7 → we need 9-7=2, not 7-9=-2.',
            'if (nums[i] + nums[i-1] == target)': 'Only checks adjacent pairs. The answer could be any two elements.',
            'if (map.ContainsKey(nums[i]))': 'This checks if the current number is in the map — we want to check if its complement is.',
          }
        },
        snippet: '        int complement = target - nums[i];\n        if (map.ContainsKey(complement)) {'
      },
      {
        prompt: 'Step 4 — return the answer and store the current number',
        blocks: [
          { code: '    return new int[] { map[complement], i };\n}\nmap.Add(nums[i], i);', correct: true },
          { code: '    return new int[] { i, complement };\n}\nmap.Add(nums[i], i);', correct: false },
          { code: '    return new int[] { map[complement], i };\n}\nmap.Add(i, nums[i]);', correct: false },
          { code: '    return map[complement];\n}\nmap.Add(nums[i], i);', correct: false },
        ],
        feedback: {
          correct: "map[complement] retrieves the index where we saw the complement. i is the current index. Store nums[i]→i after the check so we don't pair a number with itself.",
          wrong: {
            '    return new int[] { i, complement };\n}\nmap.Add(nums[i], i);': 'complement is a number value, not an index. map[complement] gives the index.',
            '    return new int[] { map[complement], i };\n}\nmap.Add(i, nums[i]);': 'Dictionary is keyed by number. map.Add(i, nums[i]) flips the key/value — lookup would break.',
            '    return map[complement];\n}\nmap.Add(nums[i], i);': 'Method returns int[], not int. We need both indices wrapped in an array.',
          }
        },
        snippet: '            return new int[] { map[complement], i };\n        }\n        map.Add(nums[i], i);\n    }\n    return new int[] {};'
      }
    ]
  },
  {
    id: 'validpalindrome',
    title: 'Valid Palindrome',
    subtitle: 'Given a string, return true if it reads the same forwards and backwards (ignoring case and non-alphanumeric chars).',
    difficulty: 'easy',
    language: 'csharp',
    sig: 'public bool IsPalindrome(string s) {',
    steps: [
      {
        prompt: 'Step 1 — set up two pointers at each end of the string',
        blocks: [
          { code: 'int left = 0, right = s.Length - 1;', correct: true },
          { code: 'int left = 0, right = s.Length;', correct: false },
          { code: 'int i = 0; int j = 1;', correct: false },
          { code: 'char[] arr = s.ToCharArray();', correct: false },
        ],
        feedback: {
          correct: 'Two pointers starting at both ends and walking inward — the classic palindrome pattern.',
          wrong: {
            'int left = 0, right = s.Length;': "s.Length is one past the end. Last valid index is s.Length - 1 or you'll get an IndexOutOfRangeException.",
            'int i = 0; int j = 1;': 'j=1 starts adjacent to i, not at the end. Two-pointer palindrome needs opposite ends.',
            'char[] arr = s.ToCharArray();': "We can index strings directly in C# — no need to convert. Keep it simple.",
          }
        },
        snippet: '    int left = 0, right = s.Length - 1;'
      },
      {
        prompt: "Step 2 — loop while the pointers haven't crossed",
        blocks: [
          { code: 'while (left < right)', correct: true },
          { code: 'while (left <= right)', correct: false },
          { code: 'for (int i = 0; i < s.Length; i++)', correct: false },
          { code: 'while (left != right)', correct: false },
        ],
        feedback: {
          correct: "left < right stops when they meet or cross. When they meet at the center there's nothing to compare — we're done.",
          wrong: {
            'while (left <= right)': "When left==right we're at the middle character — comparing it to itself always passes, harmless but unnecessary.",
            'for (int i = 0; i < s.Length; i++)': "A single index doesn't give us the two-pointer pattern. We need both ends moving inward.",
            'while (left != right)': "In even-length strings left and right cross without ever being equal — infinite loop.",
          }
        },
        snippet: '    while (left < right) {'
      },
      {
        prompt: 'Step 3 — skip non-alphanumeric characters on each side',
        blocks: [
          { code: 'while (left < right && !char.IsLetterOrDigit(s[left])) left++;\nwhile (left < right && !char.IsLetterOrDigit(s[right])) right--;', correct: true },
          { code: 's = s.Replace(" ", "");', correct: false },
          { code: 'if (!char.IsLetter(s[left])) left++;', correct: false },
          { code: 'while (!char.IsLetterOrDigit(s[left])) left++;', correct: false },
        ],
        feedback: {
          correct: 'We skip non-alphanumeric chars on both sides before comparing. The left < right guard prevents overstepping.',
          wrong: {
            's = s.Replace(" ", "");': 'Only removes spaces, not punctuation. Also creates a new string each time — slow.',
            'if (!char.IsLetter(s[left])) left++;': 'Two issues: if only moves one step (need a loop), and IsLetter misses digits.',
            'while (!char.IsLetterOrDigit(s[left])) left++;': 'Missing the left < right guard — left could overshoot past right.',
          }
        },
        snippet: '        while (left < right && !char.IsLetterOrDigit(s[left])) left++;\n        while (left < right && !char.IsLetterOrDigit(s[right])) right--;'
      },
      {
        prompt: 'Step 4 — compare the characters and move the pointers',
        blocks: [
          { code: 'if (char.ToLower(s[left]) != char.ToLower(s[right]))\n    return false;\nleft++; right--;', correct: true },
          { code: 'if (s[left] != s[right]) return false;\nleft++; right--;', correct: false },
          { code: 'if (char.ToLower(s[left]) == char.ToLower(s[right]))\n    return true;\nleft++; right--;', correct: false },
          { code: 'left++; right--;\nif (char.ToLower(s[left]) != char.ToLower(s[right])) return false;', correct: false },
        ],
        feedback: {
          correct: 'ToLower on both sides handles case-insensitivity. Mismatch → return false. Otherwise advance both pointers inward.',
          wrong: {
            'if (s[left] != s[right]) return false;\nleft++; right--;': 'Missing case normalization. "A" != "a" would wrongly fail on valid palindromes.',
            'if (char.ToLower(s[left]) == char.ToLower(s[right]))\n    return true;\nleft++; right--;': "Returning true on the first match is wrong — one matching pair doesn't make the whole thing a palindrome.",
            'left++; right--;\nif (char.ToLower(s[left]) != char.ToLower(s[right])) return false;': 'Advancing before comparing skips the current characters entirely.',
          }
        },
        snippet: '        if (char.ToLower(s[left]) != char.ToLower(s[right])) return false;\n        left++; right--;\n    }\n    return true;'
      }
    ]
  },
  {
    id: 'besttime',
    title: 'Best Time to Buy & Sell Stock',
    subtitle: 'Given prices[], find the max profit from buying on one day and selling on a later day.',
    difficulty: 'easy',
    language: 'csharp',
    sig: 'public int MaxProfit(int[] prices) {',
    steps: [
      {
        prompt: 'Step 1 — initialize our tracking variables',
        blocks: [
          { code: 'int minPrice = int.MaxValue, maxProfit = 0;', correct: true },
          { code: 'int minPrice = 0, maxProfit = 0;', correct: false },
          { code: 'int buy = prices[0], sell = prices[1];', correct: false },
          { code: 'int minPrice = prices[0], maxProfit = int.MinValue;', correct: false },
        ],
        feedback: {
          correct: 'int.MaxValue for minPrice means the first real price will always be smaller. maxProfit starts at 0 — if no profit is possible, 0 is the right answer.',
          wrong: {
            'int minPrice = 0, maxProfit = 0;': 'minPrice=0 means no actual price will ever be lower, so minPrice never updates.',
            'int buy = prices[0], sell = prices[1];': 'This assumes the answer involves index 0 and 1 — the best pair could be anywhere.',
            'int minPrice = prices[0], maxProfit = int.MinValue;': 'maxProfit=int.MinValue would force a negative return even when the answer is 0.',
          }
        },
        snippet: '    int minPrice = int.MaxValue, maxProfit = 0;'
      },
      {
        prompt: 'Step 2 — loop and update minPrice and maxProfit',
        blocks: [
          { code: 'foreach (int price in prices) {\n    minPrice = Math.Min(minPrice, price);\n    maxProfit = Math.Max(maxProfit, price - minPrice);\n}', correct: true },
          { code: 'for (int i=0; i<prices.Length; i++)\n    for (int j=i+1; j<prices.Length; j++)\n        maxProfit = Math.Max(maxProfit, prices[j]-prices[i]);', correct: false },
          { code: 'foreach (int price in prices) {\n    maxProfit = Math.Max(maxProfit, price - minPrice);\n    minPrice = Math.Min(minPrice, price);\n}', correct: false },
          { code: 'foreach (int price in prices)\n    if (price > minPrice) maxProfit = price - minPrice;\n    else minPrice = price;', correct: false },
        ],
        feedback: {
          correct: 'One pass: update minPrice first, then compute profit against today\'s price. O(n) time, O(1) space.',
          wrong: {
            'for (int i=0; i<prices.Length; i++)\n    for (int j=i+1; j<prices.Length; j++)\n        maxProfit = Math.Max(maxProfit, prices[j]-prices[i]);': 'Correct logic but O(n²) — brute force. The one-pass approach is expected.',
            'foreach (int price in prices) {\n    maxProfit = Math.Max(maxProfit, price - minPrice);\n    minPrice = Math.Min(minPrice, price);\n}': 'Order matters! You update maxProfit before minPrice — on the first iteration minPrice is still int.MaxValue.',
            'foreach (int price in prices)\n    if (price > minPrice) maxProfit = price - minPrice;\n    else minPrice = price;': 'maxProfit is overwritten not accumulated — a later smaller profit would erase a bigger earlier one.',
          }
        },
        snippet: '    foreach (int price in prices) {\n        minPrice = Math.Min(minPrice, price);\n        maxProfit = Math.Max(maxProfit, price - minPrice);\n    }'
      },
      {
        prompt: 'Step 3 — return the answer',
        blocks: [
          { code: 'return maxProfit;', correct: true },
          { code: 'return maxProfit - minPrice;', correct: false },
          { code: 'return minPrice;', correct: false },
          { code: 'return Math.Max(0, maxProfit);', correct: false },
        ],
        feedback: {
          correct: 'maxProfit already holds the best answer. Clean and simple.',
          wrong: {
            'return maxProfit - minPrice;': 'maxProfit is already a profit value. Subtracting minPrice again is meaningless.',
            'return minPrice;': 'minPrice is the cheapest buying day, not the profit.',
            'return Math.Max(0, maxProfit);': 'Not wrong but redundant — maxProfit is already ≥ 0 by design.',
          }
        },
        snippet: '    return maxProfit;'
      }
    ]
  }
]