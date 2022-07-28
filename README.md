Thanks to [Dirk Lemstra](https://github.com/dlemstra/code-sign-action) and [Dana-Prajea](https://github.com/Dana-Prajea/code-sign-action) for providing a base to create this action.

# Code sign a file

This action signs files that are supported by `signtool.exe` with a code signing certificate that takes in a password. This action only works on Windows and that means it should run on `windows-latest`.

## Inputs

### `certificate`

**Required** The base64 encoded certificate.

### `password`

**Required** Certificate Password. Used to add to the machine store.

### `certificatesha1`

**Required** SHA1 hash for the certificate. This and/or the `certificatename` is required for the signing to be successful.

The following command displays the `Cert Hash(sha1)` line:
```
> certutil -dump .\certificate.pfx
```

### `certificatename`

**Required** The name of the certificate. This and/or the `certificatesha1` is required for the signing to be successful.

### `folder`

**Required** The folder that contains the libraries to sign.

### `recursive`

**Optional** Recursively search for DLL files.

### `timestampUrl`

**Optional** Url of the timestamp server.  Default is 'http://timestamp.verisign.com/scripts/timstamp.dll'

### `debug`

**Optional** If true inserts `/debug /v` options.

## Example usage

```
runs-on: windows-latest
steps:
  uses: OrhanKupusoglu/code-sign-action@master
  with:
    certificate: '${{ secrets.CERTIFICATE }}'
    password: '${{ secrets.PASSWORD }}'
    certificatesha1: '${{ secrets.CERTHASH }}'
    certificatename: '${{ secrets.CERTNAME }}'
    folder: 'files'
    timestampUrl: 'http://timestamp.verisign.com/scripts/timstamp.dll'
    recursive: true
    debug: true
```
