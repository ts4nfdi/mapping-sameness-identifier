// from <https://github.com/tc39/proposal-compare-strings-by-codepoint?tab=readme-ov-file#manual-iteration>
function codePointCompare (left, right) {
  const leftIter = left[Symbol.iterator]()
  const rightIter = right[Symbol.iterator]()
  for (;;) {
    const { value: leftChar } = leftIter.next()
    const { value: rightChar } = rightIter.next()
    if (leftChar === undefined && rightChar === undefined) {
      return 0
    } else if (leftChar === undefined) {
      // left is a prefix of right.
      return -1
    } else if (rightChar === undefined) {
      // right is a prefix of left.
      return 1
    }
    const leftCodepoint = leftChar.codePointAt(0)
    const rightCodepoint = rightChar.codePointAt(0)
    if (leftCodepoint < rightCodepoint) return -1
    if (leftCodepoint > rightCodepoint) return 1
  }
}

// only available at NodeJS, use window.crypto.subtle.digest on modern browsers
import crypto from "crypto" 

function mappingSamenessIdentifier(mapping) {
  const { subjects, objects, predicate, negativity } = mapping

  subjects.sort(codePointCompare)
  objects.sort(codePointCompare)

  const str = [subjects.join("|"), predicate, objects.join("|")].join(" ")
  const bytes = new TextEncoder().encode(str)
  const digest = crypto.createHash('sha256').update(Buffer.from(bytes)).digest("hex")
  
  return `mapping:${digest}${negativity ? "~" : ""}`
}


import fs from "fs"
console.log(mappingSamenessIdentifier(JSON.parse(fs.readFileSync(0, 'utf-8'))))
