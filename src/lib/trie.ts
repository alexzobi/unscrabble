// /*
// Please write a function that accepts a single string as input, and that returns a list of English words that can be created using some combination of the letters in the input string.

// Example input: "oogd"
// Example output: ["good", "god", "dog", "goo", "do", "go"]

// You can assume you'll be given an array of strings that enumerates all valid English words. To determine whether a word is a valid word, you can simply check for its presence in the array (e.g., `WORDS.includes(word)`)
// */

// /* Notes:
// - don't reuse letters
// - sanitize input (no non-alphabetical characters)
// - don't recheck the same letter
// - only build tree for existing letters in search word.
// - build separate trees for each letter of the alphabet and read one into memory at a time.
// */

import words from './words.json'

/**
 * The Leaf class contains the crux of our logic. This problem assumes that we
 * will be given an array of words. However, arrays are not ideal for our situation.
 * If we were to rely on an array for checking our results, then we would have to
 * enumerate every possible combination of the letters given and then check each
 * one of those combinations in the array. Instead, we can use the array to build
 * a trie/tree where its depth is only as far as the longest word in the english
 * language and we can can look at only the letters we have available from our
 * charset at any given time to see if we can progress one level deeper into the
 * tree. As well, we can track what leaf nodes are actually valid words at time
 * of construction so that all we need to do is check a leaf to know if the branch
 * to that point forms a valid word. this is usefull because we may have additional
 * letters left in our available charset to check, but we don't need to loop over
 * the same leaf nodes multiple times.
 *
 * Obviously, this data structure is a tradeoff between time and space. Lookups
 * will be fast because the entire English dictionary is stored as a tree in memory.
 * This structure could be further optimized if we had data that was broken down
 * into files based on the letters of the alphabet. Then we would only have to
 * build leaf nodes for the chars available in our charset. at the time of checking.
 * In other words, when the user inputs "oogd", we would only build the branches
 * from files oWords.json, gWords.json and dWords.json, assuming such files existed.
 * We could then choose to trade off between how frequently we're clearing and
 * rebuilding the tree to reduce memory consumption, at the cost of adding more
 * time to each call of the function.
 */
class Leaf {
  // This is the letter the node represents. It's not really being used for anything,
  // but it feels weird to me having a node with no value. Plus, easier for debugging :)
  value?: string;

  // Children is a key/value pair where the key is the letter the leaf represents
  children: Record<string, Leaf> = {}

  // The tree is built based on the entries in the dictionary. Therefore, we know
  // that if no more letters are available from the string to add nodes to the tree,
  // we have hit the end of the word and therefore it is a valid word.
  // that said, we might find another word that contains that word, in which case
  // the leaf node, despite being a full word, also contains children.
  // Example: law isWord=true, lawn isWord=true.
  isWord = false

  // A simple variable just to prevent me from having to do ugly code like
  // `if (!this.value)` which wouldn't be as easy to grok to other developers
  // reading through the code
  isRoot = false

  constructor(value?: string) {
    // if the Leaf node is being constructed without a value, it is the root
    // and we need to build the tree.
    if (!value) {
      this.isRoot = true
      this.buildTree()
    } else {
      this.value = value
    }
  }

  // We haven't been given any guarantees that the input string will not contain
  // invalid characters, so we must sanitize
  sanitizeInput(str: string): string {
    return str.replaceAll(new RegExp('[^a-zA-Z]', 'gm'), '').toLowerCase()
  }

  // Here, we take all of the words provided in the array of valid words and actually
  // build our tree
  buildTree() {
    words.forEach(word => {
      const sanitizedWord = this.sanitizeInput(word)
      this.addSubstring(sanitizedWord)
    })
  }

  // This function is used to add Leaf nodes to our tree. If the input value
  // has a length of zero, we've hit the end of our task. If it still has length,
  // we need to continue recursively calling addSubstring until the entire word
  // has been added to our tree, creating new child nodes along the way as we go.
  addSubstring(substring: string) {
    if (!substring.length) {
      this.isWord = true

      return
    }

    const letter = substring[0]
    const remainder = substring.substring(1)
    let child = this.children[letter]

    if (!child) {
      child = new Leaf(letter)
      this.children[letter] = child
    }

    child.addSubstring(remainder)
  }

  // This is the meat and potatoes, as they say. This function takes two arguements:
  // the word we've built so far and the remaining letters we have to check. In
  // the example of our prompt, "oogd", we would start with `currWord=""` and
  // `availableLetters=["o", "o", "g", "d"]`. after the first call to this function,
  // we would have four additional calls on the call stack:
  // 1. getPossibleWords("o", ["o", "g", "d"])
  // 2. getPossibleWords("o", ["o", "g", "d"])
  // 3. getPossibleWords("g", ["o", "o", "d"])
  // 4. getPossibleWords("d", ["o", "o", "g"])
  // It is a recursive call, so every one of those four calls would then repeat
  // the process. This of course leaves room for improvement because we're
  // duplicating work, but time constraints prevented further optimization.
  // Each recursive call bottoms out once there is no more children in the tree.
  // we can do this because the tree is built only of valid words. So if we hit
  // the bottom, that means there are no more valid words possible, even if we
  // have remaining letters available to us to check.
  // The return value is an array of all possible words, containing duplicates :'(
  getPossibleWords(currWord: string, availableLetters: string[]) {
    let createdWords: string[] = []
    let sanitizedLetters = [...availableLetters]

    if (this.isRoot) {
      sanitizedLetters = this.sanitizeInput(availableLetters.join('')).split("")
    }

    if (this.isWord) {
      createdWords.push(currWord)
    }

    for (let i = 0; i < availableLetters.length; i++) {
      const currLetter = availableLetters[i]
      const nextChild = this.children[currLetter]
      if (nextChild) {
        const remainingLetters = [...availableLetters]
        remainingLetters.splice(i, 1)
        const newWords = nextChild.getPossibleWords(`${currWord}${currLetter}`, remainingLetters)

        createdWords = [...createdWords, ...newWords]
      }
    }

    return createdWords
  }
}

// Here, we're instantiating the trie/tree. It's happening here and it is not
// exported because we don't want files outside of this one accessing it. They
// have no business touching our stuff! Another solution would be to instead of
// exporting just a function, we could export the tree, making all values private,
// with the exception of our getAllWordCombos function.
const tree = new Leaf()

/**
 * This function is used as a simple wrapper to prepare the input for consumption
 * by our English dictionary tree and de-dupe the results before returning.
 * @param str - the string of characters available for creating words
 * @returns an array of all possible valid scrabble words
 */

export const getAllWordCombos = (str: string): string[] => {
  const allCombosWithRedundancies = tree.getPossibleWords("", str.split(""))
  const allCombosSet = new Set(allCombosWithRedundancies)

  return Array.from(allCombosSet)
}