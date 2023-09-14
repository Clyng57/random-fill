
import ByteView from 'byteview'
import { randomFillSync } from 'crypto'

const MAX_BYTESR = 1 << 16
const MAX_BYTEVIEW_SIZE = 0x7FFFFFFF

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
        randomFillSync(view.subarray(generated, end))
        generated += MAX_BYTESR
      }
    } else {
      randomFillSync(view)
    }

    return view
  } catch (err) {
    throw new Error(err)
  }
}
