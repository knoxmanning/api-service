// parser.js
const { parse } = require('path');

class Parser {
  constructor(options = {}) {
    this.options = {
      strictMode: false,
      ...options
    };
  }

  parseFile(filePath) {
    try {
      if (!filePath) {
        throw new Error('File path is required');
      }

      const { ext, name, dir } = parse(filePath);
      const isValid = this.validateExtension(ext);

      if (!isValid && this.options.strictMode) {
        throw new Error(`Invalid file extension: ${ext}`);
      }

      return {
        name,
        extension: ext,
        directory: dir,
        isValid
      };
    } catch (error) {
      console.error(`Error parsing file: ${error.message}`);
      throw error;
    }
  }

  validateExtension(ext) {
    const validExtensions = ['.json', '.yaml', '.yml', '.xml'];
    return validExtensions.includes(ext.toLowerCase());
  }
}

module.exports = Parser;