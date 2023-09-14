
import ByteView from 'byteview'

const MAX_BYTESR = 1 << 16
const MAX_BYTEVIEW_SIZE = 0x7FFFFFFF

let warned = false

/**
 *
 * @type {<T extends ArrayBufferView | ByteView | null>(array: T) => T}
 */
const getRandomValues = (() => {
  if (
    typeof window !== 'undefined' &&
    typeof window.crypto !== 'undefined' &&
    typeof window.crypto.getRandomValues === 'function'
  ) {
    return window.crypto.getRandomValues.bind(crypto)
  } else {
    return insecureRandomValues
  }
})()

/**
 *
 * @template {ByteView | ArrayBufferView} T
 * @param {T} view
 * @returns {T}
 */
export default function randomFill (view) {
  try {
    if (!ByteView.isView(view)) {
      throw new TypeError('`view` must be a TypedArray or DataView')
    }

    const byteLength = view.byteLength

    if (byteLength > MAX_BYTEVIEW_SIZE) {
      throw new RangeError('requested over the maximum amount of random bytes')
    }

    if (byteLength > MAX_BYTESR) {
      let generated = 0
      while (generated < byteLength) {
        let end = generated + MAX_BYTESR
        if (end > byteLength) {
          end -= (end - byteLength)
        }
        getRandomValues(view.subarray(generated, end))
        generated += MAX_BYTESR
      }
    } else {
      getRandomValues(view)
    }

    return view
  } catch (err) {
    throw new Error(err)
  }
}

function insecureRandomValues (array) {
  if (!warned) {
    console.warn(
      'Using an insecure random number generator, this should only happen when running in a debugger without support for crypto.getRandomValues'
    )
    warned = true
  }

  const length = array.length
  let index = -1
  let byte = 0

  while (++index < length) {
    if ((index & 0x03) === 0) byte = Math.random() * 0x100000000
    array[index] = (byte >>> ((index & 0x03) << 3)) & 0xff
  }

  return array
}
