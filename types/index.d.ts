
import type ByteView from 'byteview'

declare module '@neumatter/random-fill'

declare function randomFill<T extends ByteView | ArrayBufferView> (view: T): T

export default randomFill
