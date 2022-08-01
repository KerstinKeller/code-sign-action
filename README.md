Thanks to [Dirk Lemstra](https://github.com/dlemstra/code-sign-action) and [Dana-Prajea](https://github.com/Dana-Prajea/code-sign-action) for providing a base to create this action.

# Build the Source Files

To build the [TypeScript](https://en.wikipedia.org/wiki/TypeScript) source files [Node.js](https://en.wikipedia.org/wiki/Node.js), [npm](https://en.wikipedia.org/wiki/Npm_(software)) (installed with Node.js) and TypeScript compiler is required.

On Ubuntu the latest versions of the required tools can be installed with the following commands:
```
## https://github.com/nodesource/distributions/blob/master/README.md
$ curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
$ sudo apt-get install -y nodejs

## update npm globally
$ npm -v
$ sudo npm install -g npm@latest

## install TypeScript globally vith npm
$ sudo npm install -g typescript@latest
$ tsc -v

## ... or install just for this repo
$ npm install
```

To build the source files and generate the required [JavaScript](https://en.wikipedia.org/wiki/JavaScript) files run the following command:
```
$ npm run build
```

# Code sign a file

This action signs files that are supported by [signtool.exe](https://docs.microsoft.com/en-us/dotnet/framework/tools/signtool-exe) with a code signing certificate that takes in a password. This action only works on Windows build environments.

## Inputs

### `cert_body`

**Required** The base64 encoded certificate generated with SHA256.

The following [Windows PowerShell](https://en.wikipedia.org/wiki/PowerShell) commands show how to generate a self-signed certificate for testing purposes:
- The PowerShell must be started with "Run as administrator".
- The -HashAlgorithm can be specified as either [SHA1](https://en.wikipedia.org/wiki/SHA-1) or [SHA256](https://en.wikipedia.org/wiki/SHA-2).

```
# https://docs.microsoft.com/en-us/powershell/module/pki/new-selfsignedcertificate
> $cert = New-SelfSignedCertificate -Subject "CN=TestCert,E=admin@testcert.com" -DnsName testcert.com -HashAlgorithm SHA256 -NotBefore 2022-07-29T20:00 -NotAfter 2032-07-29T20:00 -CertStoreLocation cert:\LocalMachine\My -type CodeSigning

# https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/convertto-securestring
> $pwd = ConvertTo-SecureString -String "1234" -Force -AsPlainText

# path to certificate
> $path = "cert.pfx"

# https://docs.microsoft.com/en-us/powershell/module/pki/export-pfxcertificate
> Export-PfxCertificate -cert $cert -FilePath $path -Password $pwd

# copy this BASE64 line & paste into a GitHub Secret
> [convert]::ToBase64String((Get-Content -path $path -Encoding byte))
```

### `cert_pswd`

**Required** Certificate Password. Used to add to the machine store.

### `cert_algo`

**Optional** This string is passed as the '/fd' adn '/td' option. Its default value is 'sha1'.

### `cert_hash`

**Optional** The hash of the certificate. This and/or the `cert_name` is required for the signing to be successful.

The following command displays the `Cert Hash(sha1)` line even for SHA256:
```
# 'path' is declared above
> certutil -dump $path
```

**WARNING:** If the hash value is not in uppercase, then in the logs its uppercase value will be visible.

### `cert_name`

**Optional** This string is passed as the '/n' option. This and/or the `cert_hash` is required for the signing to be successful.

### `timestamp_url`

**Optional** Url of the timestamp server.  Its default value is 'http://sha256timestamp.ws.symantec.com/sha256/timestamp'.

### `folder`

**Required** The folder that contains the libraries to sign.

### `recursive`

**Optional** If "true" recursively search for DLL files.

### `debug`

**Optional** If "true" insert `/debug` option instead of the verbose `/v` option.

## Example usage

```
runs-on: windows-2019
steps:
  uses: OrhanKupusoglu/code-sign-action@master
  with:
    cert_body: '${{ secrets.CERT_BODY }}'
    cert_pswd: '${{ secrets.CERT_PSWD }}'
    cert_algo: '${{ secrets.CERT_ALGO }}'
    cert_hash: '${{ secrets.CERT_HASH }}'
    timestamp_url: 'http://tsa.quovadisglobal.com/TSS/HttpTspServer'
    folder: '${{ runner.workspace }}/build'
    debug: true
```
