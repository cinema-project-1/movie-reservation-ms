/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
require('dotenv').config({ path: __dirname + '/env-vars/.local.env' });

const operation = process.argv[2]; // 'create' or 'generate'
const migrationName = process.argv[3]?.split(' ').join('_'); // Name of the migration

let dAtt = '';
if (operation === 'generate') {
  dAtt = '-d src/common/config/migrations.typeorm.config.ts';
}

const baseCommand = `node -r ts-node/register ./node_modules/typeorm/cli.js ${dAtt} migration:${operation}`;

const command = migrationName
  ? `${baseCommand} src/migrations/${migrationName}`
  : baseCommand;

exec(
  command,
  {
    cwd: __dirname,
    env: {
      ...process.env,
    },
  },
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
  },
);