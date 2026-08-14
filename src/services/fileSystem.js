/**
 * fileSystem.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Native HTML5 FileSystemAccess wrapper to recursively read dropped folders.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Parses the DataTransferItemList from a drop event.
 * Recursively reads directories.
 * Returns an array of File objects.
 * 
 * @param {DataTransferItemList} items
 * @returns {Promise<File[]>}
 */
export async function getFilesFromDataTransfer(items) {
  const files = [];
  const promises = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind === 'file') {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        promises.push(traverseFileTree(entry, files));
      }
    }
  }

  await Promise.all(promises);
  return files;
}

function traverseFileTree(item, path = '', files) {
  return new Promise((resolve, reject) => {
    if (item.isFile) {
      item.file((file) => {
        // Attach the relative path to the file object for easy mapping
        file.filepath = path + file.name;
        files.push(file);
        resolve();
      }, reject);
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      dirReader.readEntries((entries) => {
        const promises = [];
        for (let i = 0; i < entries.length; i++) {
          promises.push(traverseFileTree(entries[i], path + item.name + '/', files));
        }
        Promise.all(promises).then(resolve).catch(reject);
      }, reject);
    } else {
      resolve();
    }
  });
}
