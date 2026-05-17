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
  },{
    id: 'containsduplicate',
    title: 'Contains Duplicate',
    subtitle: 'Given an integer array, return true if any value appears at least twice.',
    difficulty: 'easy',
    language: 'csharp',
    sig: 'public bool ContainsDuplicate(int[] nums) {',
    steps: [
      {
        prompt: 'Step 1 — what data structure tracks what we have seen?',
        blocks: [
          { code: 'var seen = new HashSet<int>();', correct: true },
          { code: 'var seen = new Dictionary<int, int>();', correct: false },
          { code: 'var seen = new List<int>();', correct: false },
          { code: 'int[] seen = new int[nums.Length];', correct: false },
        ],
        feedback: {
          correct: 'HashSet<int> is perfect here — we only need to know if a number exists, not its index. O(1) lookup and no duplicates by definition.',
          wrong: {
            'var seen = new Dictionary<int, int>();': 'Dictionary works but is overkill — we don\'t need to store a value, just whether the key exists. HashSet is cleaner.',
            'var seen = new List<int>();': 'List lookup is O(n) — we\'d be doing O(n) work inside an O(n) loop, making it O(n²) total.',
            'int[] seen = new int[nums.Length];': 'An array can\'t store arbitrary integers as keys. We\'d need to know the range of values upfront.',
          }
        },
        snippet: '    var seen = new HashSet<int>();'
      },
      {
        prompt: 'Step 2 — loop and check for duplicates',
        blocks: [
          { code: 'foreach (int n in nums) {\n    if (!seen.Add(n)) return true;\n}', correct: true },
          { code: 'foreach (int n in nums) {\n    if (seen.Contains(n)) return true;\n    seen.Add(n);\n}', correct: false },
          { code: 'for (int i=0; i<nums.Length; i++)\n    for (int j=i+1; j<nums.Length; j++)\n        if (nums[i] == nums[j]) return true;', correct: false },
          { code: 'foreach (int n in nums)\n    seen.Add(n);', correct: false },
        ],
        feedback: {
          correct: 'Elegant — HashSet.Add() returns false if the item already exists. One line handles both the check and the add.',
          wrong: {
            'foreach (int n in nums) {\n    if (seen.Contains(n)) return true;\n    seen.Add(n);\n}': 'Correct logic but two lines where one works. seen.Add() already returns false on duplicate — use that.',
            'for (int i=0; i<nums.Length; i++)\n    for (int j=i+1; j<nums.Length; j++)\n        if (nums[i] == nums[j]) return true;': 'Correct but O(n²) — brute force. The HashSet approach is O(n).',
            'foreach (int n in nums)\n    seen.Add(n);': 'This adds everything but never checks for duplicates or returns true.',
          }
        },
        snippet: '    foreach (int n in nums) {\n        if (!seen.Add(n)) return true;\n    }'
      },
      {
        prompt: 'Step 3 — return the result if no duplicate found',
        blocks: [
          { code: 'return false;', correct: true },
          { code: 'return true;', correct: false },
          { code: 'return seen.Count > 0;', correct: false },
          { code: 'return nums.Length > 0;', correct: false },
        ],
        feedback: {
          correct: 'If we made it through the whole loop without finding a duplicate, there are none — return false.',
          wrong: {
            'return true;': 'If we reach this line, we never found a duplicate. Returning true here would always report a duplicate even when there isn\'t one.',
            'return seen.Count > 0;': 'seen.Count is always > 0 if the array has elements. This doesn\'t tell us anything about duplicates.',
            'return nums.Length > 0;': 'Array length has nothing to do with whether duplicates exist.',
          }
        },
        snippet: '    return false;'
      }
    ]
  },
  {
    id: 'maxsubarray',
    title: 'Maximum Subarray',
    subtitle: 'Find the contiguous subarray with the largest sum and return its sum.',
    difficulty: 'easy',
    language: 'csharp',
    sig: 'public int MaxSubArray(int[] nums) {',
    steps: [
      {
        prompt: 'Step 1 — initialize current and best sum',
        blocks: [
          { code: 'int current = nums[0], best = nums[0];', correct: true },
          { code: 'int current = 0, best = 0;', correct: false },
          { code: 'int current = int.MinValue, best = int.MinValue;', correct: false },
          { code: 'int current = nums[0], best = int.MaxValue;', correct: false },
        ],
        feedback: {
          correct: 'Starting both at nums[0] handles the case where all numbers are negative — the answer is always at least the largest single element.',
          wrong: {
            'int current = 0, best = 0;': 'Starting at 0 breaks for all-negative arrays. [-3,-2,-1] should return -1 but would return 0.',
            'int current = int.MinValue, best = int.MinValue;': 'int.MinValue + a negative number overflows in C#. Start with nums[0] instead.',
            'int current = nums[0], best = int.MaxValue;': 'best = int.MaxValue means no real sum will ever beat it — best never updates.',
          }
        },
        snippet: '    int current = nums[0], best = nums[0];'
      },
      {
        prompt: 'Step 2 — loop from index 1 and apply Kadane\'s algorithm',
        blocks: [
          { code: 'for (int i = 1; i < nums.Length; i++) {\n    current = Math.Max(nums[i], current + nums[i]);\n    best = Math.Max(best, current);\n}', correct: true },
          { code: 'for (int i = 1; i < nums.Length; i++) {\n    current = current + nums[i];\n    best = Math.Max(best, current);\n}', correct: false },
          { code: 'for (int i = 0; i < nums.Length; i++) {\n    current = Math.Max(nums[i], current + nums[i]);\n    best = Math.Max(best, current);\n}', correct: false },
          { code: 'for (int i = 1; i < nums.Length; i++) {\n    current = Math.Max(nums[i], current + nums[i]);\n}', correct: false },
        ],
        feedback: {
          correct: 'Kadane\'s algorithm: at each element decide whether to extend the current subarray or start fresh. Then update best.',
          wrong: {
            'for (int i = 1; i < nums.Length; i++) {\n    current = current + nums[i];\n    best = Math.Max(best, current);\n}': 'Missing the "start fresh" decision. If current goes very negative, we should reset to just nums[i].',
            'for (int i = 0; i < nums.Length; i++) {\n    current = Math.Max(nums[i], current + nums[i]);\n    best = Math.Max(best, current);\n}': 'Starting at i=0 re-processes nums[0] which we already used to initialize current and best.',
            'for (int i = 1; i < nums.Length; i++) {\n    current = Math.Max(nums[i], current + nums[i]);\n}': 'Never updates best — we\'d only return the last current value, not the maximum we ever saw.',
          }
        },
        snippet: '    for (int i = 1; i < nums.Length; i++) {\n        current = Math.Max(nums[i], current + nums[i]);\n        best = Math.Max(best, current);\n    }'
      },
      {
        prompt: 'Step 3 — return the answer',
        blocks: [
          { code: 'return best;', correct: true },
          { code: 'return current;', correct: false },
          { code: 'return Math.Max(best, current);', correct: false },
          { code: 'return best - current;', correct: false },
        ],
        feedback: {
          correct: 'best tracked the maximum sum we ever saw across all iterations — that\'s our answer.',
          wrong: {
            'return current;': 'current is just the sum ending at the last element, not the global maximum.',
            'return Math.Max(best, current);': 'best is already always >= current by design — the Math.Max is redundant.',
            'return best - current;': 'Subtracting current from best has no meaning here.',
          }
        },
        snippet: '    return best;'
      }
    ]
  },
  {
    id: 'slidingwindowmax',
    title: 'Longest Substring Without Repeating',
    subtitle: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    language: 'csharp',
    sig: 'public int LengthOfLongestSubstring(string s) {',
    steps: [
      {
        prompt: 'Step 1 — set up the sliding window variables',
        blocks: [
          { code: 'var seen = new Dictionary<char, int>();\nint best = 0, left = 0;', correct: true },
          { code: 'var seen = new HashSet<char>();\nint best = 0;', correct: false },
          { code: 'int[] seen = new int[256];\nint best = 0, left = 0;', correct: false },
          { code: 'var seen = new Dictionary<char, int>();\nint best = 0;', correct: false },
        ],
        feedback: {
          correct: 'Dictionary<char, int> stores the last seen index of each character. left tracks the start of our current window. Together they let us jump the window forward efficiently.',
          wrong: {
            'var seen = new HashSet<char>();\nint best = 0;': 'HashSet tells us if a char exists but not where. Without the index we can\'t jump left pointer correctly.',
            'int[] seen = new int[256];\nint best = 0, left = 0;': 'Works for ASCII but breaks for Unicode. Dictionary is safer and more readable.',
            'var seen = new Dictionary<char, int>();\nint best = 0;': 'Missing left — we need to track where our current window starts to compute its length.',
          }
        },
        snippet: '    var seen = new Dictionary<char, int>();\n    int best = 0, left = 0;'
      },
      {
        prompt: 'Step 2 — loop and expand the window',
        blocks: [
          { code: 'for (int right = 0; right < s.Length; right++) {\n    if (seen.ContainsKey(s[right]))\n        left = Math.Max(left, seen[s[right]] + 1);\n    seen[s[right]] = right;\n    best = Math.Max(best, right - left + 1);\n}', correct: true },
          { code: 'for (int right = 0; right < s.Length; right++) {\n    if (seen.ContainsKey(s[right]))\n        left = seen[s[right]] + 1;\n    seen[s[right]] = right;\n    best = Math.Max(best, right - left + 1);\n}', correct: false },
          { code: 'for (int right = 0; right < s.Length; right++) {\n    while (seen.ContainsKey(s[right]))\n        seen.Remove(s[left++]);\n    seen[s[right]] = right;\n    best = Math.Max(best, right - left + 1);\n}', correct: false },
          { code: 'for (int right = 0; right < s.Length; right++) {\n    if (seen.ContainsKey(s[right]))\n        left = seen[s[right]] + 1;\n    best = Math.Max(best, right - left + 1);\n}', correct: false },
        ],
        feedback: {
          correct: 'Math.Max(left, seen[s[right]] + 1) is key — if we saw this char before but it\'s outside our current window, we don\'t move left backward.',
          wrong: {
            'for (int right = 0; right < s.Length; right++) {\n    if (seen.ContainsKey(s[right]))\n        left = seen[s[right]] + 1;\n    seen[s[right]] = right;\n    best = Math.Max(best, right - left + 1);\n}': 'Missing Math.Max — left could jump backward if the duplicate was seen before the current window start.',
            'for (int right = 0; right < s.Length; right++) {\n    while (seen.ContainsKey(s[right]))\n        seen.Remove(s[left++]);\n    seen[s[right]] = right;\n    best = Math.Max(best, right - left + 1);\n}': 'This works but is slower — removing one char at a time is O(n²) worst case. Jumping left directly is O(n).',
            'for (int right = 0; right < s.Length; right++) {\n    if (seen.ContainsKey(s[right]))\n        left = seen[s[right]] + 1;\n    best = Math.Max(best, right - left + 1);\n}': 'Never updates seen[s[right]] — stale indices stay in the dictionary and break future lookups.',
          }
        },
        snippet: '    for (int right = 0; right < s.Length; right++) {\n        if (seen.ContainsKey(s[right]))\n            left = Math.Max(left, seen[s[right]] + 1);\n        seen[s[right]] = right;\n        best = Math.Max(best, right - left + 1);\n    }'
      },
      {
        prompt: 'Step 3 — return the answer',
        blocks: [
          { code: 'return best;', correct: true },
          { code: 'return s.Length - left;', correct: false },
          { code: 'return seen.Count;', correct: false },
          { code: 'return best - left;', correct: false },
        ],
        feedback: {
          correct: 'best holds the maximum window size we ever saw. Clean and simple.',
          wrong: {
            'return s.Length - left;': 'left is just where the last window started — this gives the length of the final window only, not the maximum.',
            'return seen.Count;': 'seen.Count is the number of unique characters in the last window, not the longest window length.',
            'return best - left;': 'best is a length, not an index. Subtracting left from it makes no sense.',
          }
        },
        snippet: '    return best;'
      }
    ]
  },
  {
    id: 'binarysearch',
    title: 'Binary Search',
    subtitle: 'Given a sorted array and a target, return its index or -1 if not found.',
    difficulty: 'medium',
    language: 'csharp',
    sig: 'public int Search(int[] nums, int target) {',
    steps: [
      {
        prompt: 'Step 1 — initialize left and right pointers',
        blocks: [
          { code: 'int left = 0, right = nums.Length - 1;', correct: true },
          { code: 'int left = 0, right = nums.Length;', correct: false },
          { code: 'int left = 1, right = nums.Length - 1;', correct: false },
          { code: 'int left = 0, right = nums.Length / 2;', correct: false },
        ],
        feedback: {
          correct: 'left starts at 0, right at the last valid index. Both ends of the search space.',
          wrong: {
            'int left = 0, right = nums.Length;': 'nums.Length is out of bounds. Last valid index is nums.Length - 1.',
            'int left = 1, right = nums.Length - 1;': 'Starting left at 1 skips nums[0] — the target could be the first element.',
            'int left = 0, right = nums.Length / 2;': 'Only searches the left half. The target could be anywhere in the array.',
          }
        },
        snippet: '    int left = 0, right = nums.Length - 1;'
      },
      {
        prompt: 'Step 2 — loop and compute the midpoint',
        blocks: [
          { code: 'while (left <= right) {\n    int mid = left + (right - left) / 2;', correct: true },
          { code: 'while (left < right) {\n    int mid = left + (right - left) / 2;', correct: false },
          { code: 'while (left <= right) {\n    int mid = (left + right) / 2;', correct: false },
          { code: 'while (left <= right) {\n    int mid = left + (right - left);', correct: false },
        ],
        feedback: {
          correct: 'left <= right includes the case where both pointers land on the same element. left + (right - left) / 2 avoids integer overflow that (left + right) / 2 can cause.',
          wrong: {
            'while (left < right) {\n    int mid = left + (right - left) / 2;': 'left < right misses the case where left == right — we\'d skip checking the last remaining element.',
            'while (left <= right) {\n    int mid = (left + right) / 2;': '(left + right) can overflow if both are large ints. left + (right - left) / 2 is the safe way.',
            'while (left <= right) {\n    int mid = left + (right - left);': 'This just computes right, not the midpoint. The loop would never converge.',
          }
        },
        snippet: '    while (left <= right) {\n        int mid = left + (right - left) / 2;'
      },
      {
        prompt: 'Step 3 — check mid and move pointers',
        blocks: [
          { code: 'if (nums[mid] == target) return mid;\nelse if (nums[mid] < target) left = mid + 1;\nelse right = mid - 1;', correct: true },
          { code: 'if (nums[mid] == target) return mid;\nelse if (nums[mid] < target) left = mid;\nelse right = mid;', correct: false },
          { code: 'if (nums[mid] > target) left = mid + 1;\nelse right = mid - 1;', correct: false },
          { code: 'if (nums[mid] == target) return mid;\nelse if (nums[mid] > target) left = mid + 1;\nelse right = mid - 1;', correct: false },
        ],
        feedback: {
          correct: 'Found it → return mid. Too small → search right half (left = mid + 1). Too big → search left half (right = mid - 1).',
          wrong: {
            'if (nums[mid] == target) return mid;\nelse if (nums[mid] < target) left = mid;\nelse right = mid;': 'left = mid and right = mid don\'t make progress — the loop gets stuck on the same mid forever.',
            'if (nums[mid] > target) left = mid + 1;\nelse right = mid - 1;': 'Never checks if nums[mid] == target — we\'d skip past the answer.',
            'if (nums[mid] == target) return mid;\nelse if (nums[mid] > target) left = mid + 1;\nelse right = mid - 1;': 'Comparisons are flipped — if nums[mid] > target we should search LEFT not right.',
          }
        },
        snippet: '        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }'
      },
      {
        prompt: 'Step 4 — return if target not found',
        blocks: [
          { code: 'return -1;', correct: true },
          { code: 'return 0;', correct: false },
          { code: 'return left;', correct: false },
          { code: 'return nums.Length;', correct: false },
        ],
        feedback: {
          correct: 'Convention for "not found" in search problems is -1 — it\'s not a valid index so it\'s unambiguous.',
          wrong: {
            'return 0;': '0 is a valid index — returning it would be ambiguous between "found at index 0" and "not found".',
            'return left;': 'left is where the target would be inserted, not where it is. That\'s a different problem (Search Insert Position).',
            'return nums.Length;': 'nums.Length is out of bounds and meaningless as a "not found" signal.',
          }
        },
        snippet: '    return -1;'
      }
    ]
  },
  {
    id: 'linkedlistcycle',
    title: 'Linked List Cycle',
    subtitle: 'Given the head of a linked list, return true if it has a cycle.',
    difficulty: 'medium',
    language: 'csharp',
    sig: 'public bool HasCycle(ListNode head) {',
    steps: [
      {
        prompt: 'Step 1 — set up slow and fast pointers',
        blocks: [
          { code: 'var slow = head;\nvar fast = head;', correct: true },
          { code: 'var slow = head;\nvar fast = head.next;', correct: false },
          { code: 'var slow = head;\nvar fast = null;', correct: false },
          { code: 'var slow = head.next;\nvar fast = head;', correct: false },
        ],
        feedback: {
          correct: 'Both start at head. slow moves 1 step at a time, fast moves 2 — if there\'s a cycle they\'ll eventually meet.',
          wrong: {
            'var slow = head;\nvar fast = head.next;': 'Works but requires a null check on head before starting. Starting both at head is simpler and safer.',
            'var slow = head;\nvar fast = null;': 'fast = null means fast.next immediately throws a NullReferenceException.',
            'var slow = head.next;\nvar fast = head;': 'Offset starting positions complicate the meeting condition. Start both at head.',
          }
        },
        snippet: '    var slow = head;\n    var fast = head;'
      },
      {
        prompt: 'Step 2 — loop while fast can move',
        blocks: [
          { code: 'while (fast != null && fast.next != null) {', correct: true },
          { code: 'while (fast != null) {', correct: false },
          { code: 'while (slow != fast) {', correct: false },
          { code: 'while (fast.next != null) {', correct: false },
        ],
        feedback: {
          correct: 'We check both fast and fast.next — fast moves two steps so we need both to be non-null before moving.',
          wrong: {
            'while (fast != null) {': 'Inside the loop we call fast.next.next — if fast.next is null this throws NullReferenceException.',
            'while (slow != fast) {': 'At the very start slow == fast (both at head) so the loop never runs. We\'d always return false.',
            'while (fast.next != null) {': 'Doesn\'t check fast itself — if fast is null, fast.next throws NullReferenceException.',
          }
        },
        snippet: '    while (fast != null && fast.next != null) {'
      },
      {
        prompt: 'Step 3 — move pointers and check if they meet',
        blocks: [
          { code: 'slow = slow.next;\nfast = fast.next.next;\nif (slow == fast) return true;', correct: true },
          { code: 'slow = slow.next;\nfast = fast.next;\nif (slow == fast) return true;', correct: false },
          { code: 'fast = fast.next.next;\nslow = slow.next;\nif (slow.val == fast.val) return true;', correct: false },
          { code: 'slow = slow.next.next;\nfast = fast.next;\nif (slow == fast) return true;', correct: false },
        ],
        feedback: {
          correct: 'slow moves 1 step, fast moves 2. If they point to the same node there\'s a cycle.',
          wrong: {
            'slow = slow.next;\nfast = fast.next;\nif (slow == fast) return true;': 'Both moving at the same speed — they\'ll never catch each other in a cycle. Fast must move 2 steps.',
            'fast = fast.next.next;\nslow = slow.next;\nif (slow.val == fast.val) return true;': 'Comparing .val is wrong — two different nodes can have the same value. We need reference equality (==).',
            'slow = slow.next.next;\nfast = fast.next;\nif (slow == fast) return true;': 'slow and fast speeds are swapped — the logic still works but it\'s unconventional and confusing.',
          }
        },
        snippet: '        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }'
      },
      {
        prompt: 'Step 4 — return if no cycle found',
        blocks: [
          { code: 'return false;', correct: true },
          { code: 'return true;', correct: false },
          { code: 'return slow == null;', correct: false },
          { code: 'return fast == null;', correct: false },
        ],
        feedback: {
          correct: 'If fast reaches null, the list has an end — no cycle.',
          wrong: {
            'return true;': 'If we exit the loop it means fast hit null — the list terminates, so there\'s no cycle.',
            'return slow == null;': 'slow never reaches null in a cycle-free list before fast does. This is always false.',
            'return fast == null;': 'Technically true but misleading — just return false, it\'s cleaner.',
          }
        },
        snippet: '    return false;'
      }
    ]
  },
  {
    id: 'mergeintervals',
    title: 'Merge Intervals',
    subtitle: 'Given an array of intervals, merge all overlapping intervals.',
    difficulty: 'medium',
    language: 'csharp',
    sig: 'public int[][] Merge(int[][] intervals) {',
    steps: [
      {
        prompt: 'Step 1 — sort the intervals by start time',
        blocks: [
          { code: 'Array.Sort(intervals, (a, b) => a[0] - b[0]);', correct: true },
          { code: 'Array.Sort(intervals);', correct: false },
          { code: 'intervals.OrderBy(a => a[0]);', correct: false },
          { code: 'Array.Sort(intervals, (a, b) => a[1] - b[1]);', correct: false },
        ],
        feedback: {
          correct: 'Sorting by start time (a[0]) lets us process intervals left to right and only compare each one to the last merged interval.',
          wrong: {
            'Array.Sort(intervals);': 'Default sort on int[][] compares array references, not values — the order is undefined.',
            'intervals.OrderBy(a => a[0]);': 'LINQ OrderBy returns a new IEnumerable but doesn\'t sort in place. intervals itself is unchanged.',
            'Array.Sort(intervals, (a, b) => a[1] - b[1]);': 'Sorting by end time doesn\'t help — we need start times to detect overlaps.',
          }
        },
        snippet: '    Array.Sort(intervals, (a, b) => a[0] - b[0]);'
      },
      {
        prompt: 'Step 2 — initialize the result list',
        blocks: [
          { code: 'var result = new List<int[]>();\nresult.Add(intervals[0]);', correct: true },
          { code: 'var result = new List<int[]>();', correct: false },
          { code: 'int[][] result = new int[intervals.Length][];', correct: false },
          { code: 'var result = new List<int[]>(intervals);', correct: false },
        ],
        feedback: {
          correct: 'We seed the result with the first interval then compare every subsequent interval against the last one in result.',
          wrong: {
            'var result = new List<int[]>();': 'Empty result means we have nothing to compare against in the loop — we\'d need extra null checks.',
            'int[][] result = new int[intervals.Length][];': 'Fixed size array is awkward here — we don\'t know how many merged intervals we\'ll end up with.',
            'var result = new List<int[]>(intervals);': 'This copies all intervals in unmerged — we\'d be starting with the wrong data.',
          }
        },
        snippet: '    var result = new List<int[]>();\n    result.Add(intervals[0]);'
      },
      {
        prompt: 'Step 3 — loop and merge overlapping intervals',
        blocks: [
          { code: 'for (int i = 1; i < intervals.Length; i++) {\n    var last = result[result.Count - 1];\n    if (intervals[i][0] <= last[1])\n        last[1] = Math.Max(last[1], intervals[i][1]);\n    else\n        result.Add(intervals[i]);\n}', correct: true },
          { code: 'for (int i = 1; i < intervals.Length; i++) {\n    var last = result[result.Count - 1];\n    if (intervals[i][0] <= last[1])\n        last[1] = intervals[i][1];\n    else\n        result.Add(intervals[i]);\n}', correct: false },
          { code: 'for (int i = 0; i < intervals.Length; i++) {\n    var last = result[result.Count - 1];\n    if (intervals[i][0] <= last[1])\n        last[1] = Math.Max(last[1], intervals[i][1]);\n    else\n        result.Add(intervals[i]);\n}', correct: false },
          { code: 'for (int i = 1; i < intervals.Length; i++) {\n    if (intervals[i][0] <= intervals[i-1][1])\n        intervals[i][1] = Math.Max(intervals[i-1][1], intervals[i][1]);\n    else\n        result.Add(intervals[i]);\n}', correct: false },
        ],
        feedback: {
          correct: 'If the current interval\'s start <= last merged end, they overlap — extend the end. Math.Max handles the case where current is fully contained. Otherwise add as new.',
          wrong: {
            'for (int i = 1; i < intervals.Length; i++) {\n    var last = result[result.Count - 1];\n    if (intervals[i][0] <= last[1])\n        last[1] = intervals[i][1];\n    else\n        result.Add(intervals[i]);\n}': 'Missing Math.Max — if current interval is fully inside last, this would actually shrink last[1].',
            'for (int i = 0; i < intervals.Length; i++) {\n    var last = result[result.Count - 1];\n    if (intervals[i][0] <= last[1])\n        last[1] = Math.Max(last[1], intervals[i][1]);\n    else\n        result.Add(intervals[i]);\n}': 'Starting at i=0 compares intervals[0] against itself (which we already added) — adds it twice.',
            'for (int i = 1; i < intervals.Length; i++) {\n    if (intervals[i][0] <= intervals[i-1][1])\n        intervals[i][1] = Math.Max(intervals[i-1][1], intervals[i][1]);\n    else\n        result.Add(intervals[i]);\n}': 'Compares against the previous input interval, not the last merged result — misses multi-interval merges.',
          }
        },
        snippet: '    for (int i = 1; i < intervals.Length; i++) {\n        var last = result[result.Count - 1];\n        if (intervals[i][0] <= last[1])\n            last[1] = Math.Max(last[1], intervals[i][1]);\n        else\n            result.Add(intervals[i]);\n    }'
      },
      {
        prompt: 'Step 4 — return the result',
        blocks: [
          { code: 'return result.ToArray();', correct: true },
          { code: 'return result;', correct: false },
          { code: 'return intervals;', correct: false },
          { code: 'return result.ToArray()[0];', correct: false },
        ],
        feedback: {
          correct: 'The method returns int[][] so we convert our List<int[]> to an array with ToArray().',
          wrong: {
            'return result;': 'result is a List<int[]>, but the method signature returns int[][]. Won\'t compile.',
            'return intervals;': 'intervals is the original unsorted input — not our merged result.',
            'return result.ToArray()[0];': 'This returns only the first merged interval, not all of them.',
          }
        },
        snippet: '    return result.ToArray();'
      }
    ]
  },
  {
    id: 'climbingstairs',
    title: 'Climbing Stairs',
    subtitle: 'You can climb 1 or 2 steps at a time. How many distinct ways can you climb n stairs?',
    difficulty: 'medium',
    language: 'csharp',
    sig: 'public int ClimbStairs(int n) {',
    steps: [
      {
        prompt: 'Step 1 — handle the base cases',
        blocks: [
          { code: 'if (n <= 2) return n;', correct: true },
          { code: 'if (n == 0) return 0;', correct: false },
          { code: 'if (n == 1) return 1;\nif (n == 2) return 2;\nif (n == 3) return 3;', correct: false },
          { code: 'if (n < 0) return 0;', correct: false },
        ],
        feedback: {
          correct: 'n=1 → 1 way, n=2 → 2 ways. One line covers both. This is the Fibonacci pattern — each answer builds on the two before it.',
          wrong: {
            'if (n == 0) return 0;': 'n=0 is not a valid input per the problem constraints. We need to handle n=1 and n=2.',
            'if (n == 1) return 1;\nif (n == 2) return 2;\nif (n == 3) return 3;': 'n=3 doesn\'t need a special case — our DP will handle it. Keep base cases minimal.',
            'if (n < 0) return 0;': 'Negative n is not a valid input. The real base cases are n=1 and n=2.',
          }
        },
        snippet: '    if (n <= 2) return n;'
      },
      {
        prompt: 'Step 2 — initialize the DP variables',
        blocks: [
          { code: 'int prev2 = 1, prev1 = 2;', correct: true },
          { code: 'int prev2 = 0, prev1 = 1;', correct: false },
          { code: 'int[] dp = new int[n + 1];\ndp[1] = 1; dp[2] = 2;', correct: false },
          { code: 'int prev2 = 1, prev1 = 1;', correct: false },
        ],
        feedback: {
          correct: 'prev2 = ways to reach step 1 = 1. prev1 = ways to reach step 2 = 2. We build forward from here without an array.',
          wrong: {
            'int prev2 = 0, prev1 = 1;': 'These are Fibonacci seeds (F(0) and F(1)) but for this problem we need 1 and 2 as our starting values.',
            'int[] dp = new int[n + 1];\ndp[1] = 1; dp[2] = 2;': 'Works but uses O(n) space. The two-variable approach uses O(1) space — always prefer it.',
            'int prev2 = 1, prev1 = 1;': 'prev1 should be 2, not 1. There are 2 ways to climb 2 stairs: (1+1) or (2).',
          }
        },
        snippet: '    int prev2 = 1, prev1 = 2;'
      },
      {
        prompt: 'Step 3 — loop and compute each step',
        blocks: [
          { code: 'for (int i = 3; i <= n; i++) {\n    int curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n}', correct: true },
          { code: 'for (int i = 3; i <= n; i++) {\n    prev2 = prev1;\n    prev1 = prev1 + prev2;\n}', correct: false },
          { code: 'for (int i = 2; i <= n; i++) {\n    int curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n}', correct: false },
          { code: 'for (int i = 3; i < n; i++) {\n    int curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n}', correct: false },
        ],
        feedback: {
          correct: 'Each step = sum of previous two. We save curr first, then shift prev2 and prev1 forward. Starting at 3 since 1 and 2 are already initialized.',
          wrong: {
            'for (int i = 3; i <= n; i++) {\n    prev2 = prev1;\n    prev1 = prev1 + prev2;\n}': 'prev2 is updated before being used in the sum — by the time we compute prev1 + prev2, prev2 is already the new prev1.',
            'for (int i = 2; i <= n; i++) {\n    int curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n}': 'Starting at i=2 re-processes the already-initialized step 2 — off by one.',
            'for (int i = 3; i < n; i++) {\n    int curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n}': 'i < n stops one step early — we\'d return the answer for n-1 stairs, not n.',
          }
        },
        snippet: '    for (int i = 3; i <= n; i++) {\n        int curr = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = curr;\n    }'
      },
      {
        prompt: 'Step 4 — return the answer',
        blocks: [
          { code: 'return prev1;', correct: true },
          { code: 'return prev2;', correct: false },
          { code: 'return prev1 + prev2;', correct: false },
          { code: 'return prev1 - prev2;', correct: false },
        ],
        feedback: {
          correct: 'After the loop prev1 holds the number of ways to reach step n. prev2 is one step behind.',
          wrong: {
            'return prev2;': 'prev2 is the answer for n-1 stairs, not n.',
            'return prev1 + prev2;': 'That would be the answer for n+1 stairs — one step too far.',
            'return prev1 - prev2;': 'Subtracting has no meaning in this context.',
          }
        },
        snippet: '    return prev1;'
      }
    ]
  }
]