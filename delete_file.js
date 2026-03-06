const fs = require('fs');
const path = 'd:/KARTHIKA/documents/components/home/ArchitectureSection.tsx';
try {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    console.log('Successfully deleted the file');
  } else {
    console.log('File does not exist');
  }
} catch (err) {
  console.error('Error deleting file:', err);
}
