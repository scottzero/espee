export type PatternExample = {
    label: string
    lines: string[]
  }
  
  export type Pattern = {
    id: string
    number: number
    title: string
    subtitle: string
    coreIdea: string
    mentalModel: string
    ascii: string
    flavors: { title: string; description: string }[]
    templates: {
      python: string
      javascript: string
      csharp: string
    }
    whenToUse: string[]
  }
  
  export const patterns: Pattern[] = [
    {
      id: 'sliding-window',
      number: 1,
      title: 'Sliding Window',
      subtitle: 'Subarrays, substrings, running totals',
      coreIdea: "You need to find something about a contiguous subarray — a max sum, a longest stretch, a count. The naive approach checks every possible subarray: O(n²). Sliding window gets it down to O(n). Instead of recomputing from scratch each time, you slide a window across the array — adding one element on the right, removing one on the left.",
      mentalModel: "Picture a physical window sliding across your data. You never recount — you just: sum = sum - left + new_right",
      ascii: `arr = [2, 1, 5, 1, 3, 2]
        [———]              sum = 8
           [———]           sum = 7
              [———]        sum = 9  ← max
                 [———]     sum = 6`,
      flavors: [
        {
          title: 'Fixed window',
          description: 'Window size is given to you. e.g. "find max sum subarray of size k"'
        },
        {
          title: 'Variable window',
          description: 'Window grows/shrinks based on a condition. e.g. "longest substring with no repeating characters"'
        }
      ],
      templates: {
        python: `def max_sum_subarray(arr, k):
      window_sum = sum(arr[:k])
      max_sum = window_sum
  
      for i in range(k, len(arr)):
          window_sum += arr[i]
          window_sum -= arr[i - k]
          max_sum = max(max_sum, window_sum)
  
      return max_sum`,
        javascript: `function maxSumSubarray(arr, k) {
      let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
      let maxSum = windowSum;
  
      for (let i = k; i < arr.length; i++) {
          windowSum += arr[i];
          windowSum -= arr[i - k];
          maxSum = Math.max(maxSum, windowSum);
      }
  
      return maxSum;
  }`,
        csharp: `public int MaxSumSubarray(int[] arr, int k) {
      int windowSum = 0;
      for (int i = 0; i < k; i++) windowSum += arr[i];
      int maxSum = windowSum;
  
      for (int i = k; i < arr.Length; i++) {
          windowSum += arr[i];
          windowSum -= arr[i - k];
          maxSum = Math.Max(maxSum, windowSum);
      }
  
      return maxSum;
  }`
      },
      whenToUse: [
        '"subarray" or "substring"',
        '"contiguous"',
        '"maximum/minimum/longest/shortest" + some constraint',
        '"at most k distinct", "no repeating", "sum equals target"'
      ]
    },
    {
      id: 'two-pointers',
      number: 2,
      title: 'Two Pointers',
      subtitle: 'Sorted arrays, pair sums, palindromes',
      coreIdea: "Two pointers work when you have a sorted array and need to find a pair (or triplet) satisfying some condition. Instead of checking every pair O(n²), you start one pointer at each end and move them toward each other based on what you find. O(n) time.",
      mentalModel: "Left pointer starts at the beginning, right at the end. If their sum is too big, move right left. If too small, move left right. They'll meet in the middle.",
      ascii: `arr = [-2, 1, 3, 5, 7, 9]  target = 8
          L                 R     sum = 7, too small → move L
             L              R     sum = 10, too big → move R
             L           R        sum = 8 ✓`,
      flavors: [
        {
          title: 'Opposite ends',
          description: 'Start at both ends, move inward. Good for pair sum, palindrome check.'
        },
        {
          title: 'Same direction',
          description: 'Both start at left, one runs ahead. Good for remove duplicates, partition.'
        }
      ],
      templates: {
        python: `def two_sum_sorted(arr, target):
      left, right = 0, len(arr) - 1
  
      while left < right:
          total = arr[left] + arr[right]
          if total == target:
              return [left, right]
          elif total < target:
              left += 1
          else:
              right -= 1
  
      return []`,
        javascript: `function twoSumSorted(arr, target) {
      let left = 0, right = arr.length - 1;
  
      while (left < right) {
          const total = arr[left] + arr[right];
          if (total === target) return [left, right];
          else if (total < target) left++;
          else right--;
      }
  
      return [];
  }`,
        csharp: `public int[] TwoSumSorted(int[] arr, int target) {
      int left = 0, right = arr.Length - 1;
  
      while (left < right) {
          int total = arr[left] + arr[right];
          if (total == target) return new int[] { left, right };
          else if (total < target) left++;
          else right--;
      }
  
      return new int[] {};
  }`
      },
      whenToUse: [
        'sorted array + find pair/triplet',
        '"two sum" on sorted input',
        'palindrome check',
        'remove duplicates in place',
        'partition around a value'
      ]
    },
    {
      id: 'fast-slow-pointers',
      number: 3,
      title: 'Fast & Slow Pointers',
      subtitle: 'Cycle detection, linked lists',
      coreIdea: "Also called Floyd's tortoise and hare. One pointer moves one step at a time, the other moves two. If there's a cycle, the fast pointer will eventually lap the slow one and they'll meet. If there's no cycle, the fast pointer reaches the end.",
      mentalModel: "Two runners on a circular track. The fast runner laps the slow one eventually. On a straight track, the fast runner just reaches the end first.",
      ascii: `1 → 2 → 3 → 4 → 5
                      ↑           ↓
                      7 ← 6 ← ←←←
  
  slow: 1, 2, 3, 4, 5, 6, 7, 3...
  fast: 1, 3, 5, 7, 4, 6, 3... ← they meet`,
      flavors: [
        {
          title: 'Cycle detection',
          description: 'Do slow and fast ever point to the same node?'
        },
        {
          title: 'Find middle',
          description: 'When fast reaches the end, slow is at the middle.'
        }
      ],
      templates: {
        python: `def has_cycle(head):
      slow = fast = head
  
      while fast and fast.next:
          slow = slow.next
          fast = fast.next.next
          if slow == fast:
              return True
  
      return False`,
        javascript: `function hasCycle(head) {
      let slow = head, fast = head;
  
      while (fast && fast.next) {
          slow = slow.next;
          fast = fast.next.next;
          if (slow === fast) return true;
      }
  
      return false;
  }`,
        csharp: `public bool HasCycle(ListNode head) {
      var slow = head;
      var fast = head;
  
      while (fast != null && fast.next != null) {
          slow = slow.next;
          fast = fast.next.next;
          if (slow == fast) return true;
      }
  
      return false;
  }`
      },
      whenToUse: [
        'linked list cycle detection',
        '"find middle of linked list"',
        '"happy number" — cycles in sequences',
        'find start of cycle',
        'palindrome linked list'
      ]
    }
  ]