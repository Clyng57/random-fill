
# randomFill
![plot](https://img.shields.io/npm/v/@neumatter/random-fill?style=for-the-badge&labelColor=black)
![plot](https://img.shields.io/npm/dt/@neumatter/random-fill?style=for-the-badge&labelColor=black)
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Random Fill function. Works in nodejs and browser.

<br />

## Table of Contents
- [ Installation ](#install)
- [ Usage ](#usage)

<br />

<a name="install"></a>
## Install

```console
npm i @neumatter/random-fill
```

<br />

<a name="usage"></a>
## Usage


```js
import randomFill from '@neumatter/random-fill'

const view = new Uint8Array(32)
randomFill(view)
// ...use view
```


```js
import randomFill from '@neumatter/random-fill'
import ByteView from 'byteview'

const view = ByteView.alloc(32)
randomFill(view)
// ...use view
```


```js
import randomFill from '@neumatter/random-fill'

const view = Buffer.allocUnsafe(32)
randomFill(view)
// ...use view
```


```js
import randomFill from '@neumatter/random-fill'

const view = new Uint16Array(16)
randomFill(view)
// ...use view
```
