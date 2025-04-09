const fs = require('fs');
const path = require('path');
const logger = require('./winston');

const logDir = path.resolve(__dirname, '../../logs');
const errorLogDir = path.join(logDir, 'error');

const removeAuditFile = () => {
  try {
    const jsonFiles = fs.readdirSync(logDir);
    const errorJsonFiles = fs.readdirSync(errorLogDir);

    const auditFiles = jsonFiles.filter((file) => file.endsWith('.audit.json'));
    const errorAuditFiles = errorJsonFiles.filter((file) => file.endsWith('.audit.json'));
    console.log('auditFiles: ', auditFiles);

    auditFiles.forEach((targetName) => {
      const filePath = path.join(logDir, targetName);
      fs.unlinkSync(filePath);
    });
    errorAuditFiles.forEach((targetName) => {
      const filePath = path.join(logDir, targetName);
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    logger.error('delete file error: ', error);
  }
};

module.exports = { removeAuditFile };
