# Instructions

Select your desired min, max for the private key, the wallet (public key), and the search algorithm (sequential, random or random_sequential).

Example:

```
config {
    "wallet": "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so",
    "range": {
        "from": "0x20000000000000000",
        "to": "0x3ffffffffffffffff"
    },
    "type": "random_sequential"
}
```

Run:

`$ npm install`

And:

`$ node btc-finder.js`

## Warning
This script wears out the CPU and Disk a lot, use is at your own risk!!!