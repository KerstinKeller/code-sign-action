Thanks to [Dirk Lemstra](https://github.com/dlemstra/code-sign-action) and [Dana-Prajea](https://github.com/Dana-Prajea/code-sign-action) for providing a base to create this action.

# Code sign a file

This action signs files that are supported by [signtool.exe](https://docs.microsoft.com/en-us/dotnet/framework/tools/signtool-exe) with a code signing certificate that takes in a password. This action only works on Windows build environments.

## Inputs

### `certificate`

**Required** The base64 encoded certificate.

The following [Windows PowerShell](https://en.wikipedia.org/wiki/PowerShell) commands show how to generate a self-signed certificate for testing purposes:
```
# https://docs.microsoft.com/en-us/powershell/module/pki/new-selfsignedcertificate
> $cert = New-SelfSignedCertificate -Subject "CN=TestCert,E=admin@testcert.com" -DnsName testcert.com -HashAlgorithm SHA1 -NotBefore 2022-07-28T20:00 -NotAfter 2032-07-28T20:00 -CertStoreLocation cert:\LocalMachine\My -type CodeSigning

# https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/convertto-securestring
> $pwd = ConvertTo-SecureString -String "1234" -Force -AsPlainText

# path to certificate
> $path = "cert.pfx"

# https://docs.microsoft.com/en-us/powershell/module/pki/export-pfxcertificate
> Export-PfxCertificate -cert $cert -FilePath $path -Password $pwd

# copy this BASE64 line & paste into a GitHub Secret
> [convert]::ToBase64String((Get-Content -path $path -Encoding byte))
```

### `password`

**Required** Certificate Password. Used to add to the machine store.

### `certificatesha1`

**Required** SHA1 hash for the certificate. This and/or the `certificatename` is required for the signing to be successful.

The following command displays the `Cert Hash(sha1)` line:
```
# 'path' is declared above
> certutil -dump $path
```

### `certificatename`

**Required** The name of the certificate. This and/or the `certificatesha1` is required for the signing to be successful.

### `folder`

**Required** The folder that contains the libraries to sign.

### `recursive`

**Optional** If "true" recursively search for DLL files.

### `timestampUrl`

**Optional** Url of the timestamp server.  Default is 'http://timestamp.comodoca.com/authenticode'

### `debug`

**Optional** If "true" insert `/debug` option instead of the verbose `/v` option.

## Example usage

```
runs-on: windows-2019
steps:
  uses: OrhanKupusoglu/code-sign-action@master
  with:
    certificate: '${{ secrets.CERT_BODY }}'
    password: '${{ secrets.CERT_PWD }}'
    certificatesha1: '${{ secrets.CERT_HASH }}'
    folder: '${{ runner.workspace }}/build'
    recursive: false
    debug: true
```
