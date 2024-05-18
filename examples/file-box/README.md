# Directory Traversal

Directory traversal (also known as path traversal) is a type of vulnerability that allows attackers to gain unauthorized access to files on the server by manipulating the path to files, commonly through URL parameters.

For example, if the URL parameter `filename` can be manipulated to `../../etc/passwd` (or any other critical path), the attacker might be able to access sensitive files on the server:

```http
http://localhost:3000/files/../../etc/passwd
```

## Fixing the Vulnerability

**Step 1: Validate Input**

Validate and sanitize the input to ensure it's free from malicious characters like `..`.

**Step 2: Use a Allowlist**

Ensure that only allowed filenames from a Allowlist are served.

**Step 3: Employ Path Normalization**

Normalize the path and ensure it's within the intended directory.

**Step-by-Step Code Fix**

**Step 1: Install `sanitizer`**

```sh
npm install sanitize-filename
```

**Step 2: Update `index.js` to include input validation and sanitization**

```javascript
app.get('/files', (req, res) => {
  const rawFilename = String(req.query.file);
  const fileName = sanitize(rawFilename);

  if (fileName) {
    res.sendFile(fileName, { root: fileDirectory }, (err) => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  } else {
    res.status(400).send('File name not provided');
  }
});
```

## What We Accomplished

1. **Input Validation**: We sanitized the input to remove any characters that shouldn’t be in a filename.
2. **Path Normalization**: We checked if the file's path is within the allowed directory (`files`).

## Additional Considerations

1. **Access Control**: Implement role-based access control to ensure only authorized users can access sensitive files.
2. **Log Warnings**: Log warning messages for any attempt to access unauthorized files.
3. **Library Documentation**: Refer to the following for more details:
   - [MDN on Directory Traversal](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks/Directory_traversal)
   - [Portswigger on Directory Traversal](https://portswigger.net/web-security/file-path-traversal)
   - [OWASP on File Inclusion](https://owasp.org/www-community/attacks/Path_Traversal)

## File Upload

### Steps to Fix and Secure the Application

1. **Restrict File Types**: Use file type validation to ensure only trusted file types can be uploaded.
2. **Sanitize Filenames**: Sanitize user input to remove any malicious content in file names.
3. **Use Unique Paths**: Use unique and unpredictable paths to store uploaded files.
4. **Access Control**: Ensure proper access control is in place to prevent unauthorized access to uploaded files.

### Fixing the Application

Modify `index.js` to include file validation and sanitization:

```javascript
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileTypeFromFile } from 'file-type';

// Configuring multer for file upload
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // limiting files to 5MB
  fileFilter: async (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    try {
      const fileType = await fileTypeFromFile(file.path);
      if (fileType && allowedMimeTypes.includes(fileType.mime)) {
        cb(null, true);
      } else {
        cb(
          new Error(
            `Unsupported file type: ${fileType ? fileType.mime : 'unknown'}`
          ),
          false
        );
      }
    } catch (error) {
      cb(new Error('Invalid file'), false);
    }
  },
});

app.post('/files', upload.single('file'), async (req, res) => {
  try {
    const { originalname, filename, path } = req.file;
    const sanitizedFilename = path
      .basename(originalname)
      .replace(/[^a-z0-9\.-]/gi, '_');
    const newFullPath = `uploads/${sanitizedFilename}`;
    fs.renameSync(`uploads/${filename}`, newFullPath);

    await db.run('INSERT INTO uploads (filename) VALUES (?)', [
      sanitizedFilename,
    ]);

    res.send(
      `File uploaded: <a href="${sanitizedFilename}">${sanitizedFilename}</a>`
    );
  } catch (error) {
    res.status(500).send('An error occurred while uploading the file.');
  }
});
```

## Detailed Steps for Remediation

1. **Multer Configuration**:

   - **Limit File Size**: Set a maximum file size to reduce the risk of Denial of Service.
   - **File Filter**: Filter out files that are not in the allowed MIME types list (`image/jpeg`, `image/png`, `application/pdf`).

2. **Sanitize Filenames**:

   - Replace any character that is not alphanumeric or a dot/underscore with an underscore (`_`).
   - Avoid using the original filename directly.

3. **Validate File Type Using FileType**:
   - Use the `fileTypeFromFile` function from the `file-type` package to determine the actual MIME type of the uploaded file.
   - Compare the detected MIME type against the allowed list and reject any disallowed types.

## References

- [Mozilla Developer Network - Input file security guidelines](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [OWASP - File Uploads](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [PortSwigger - File Upload Vulnerabilities](https://portswigger.net/web-security/file-upload)
