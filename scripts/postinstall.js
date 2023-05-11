#!/usr/bin/env node

const fsa = require('fs-extra');
const { execSync } = require("child_process");

if (!process.env['CS_PAT'] && (process.argv[3] && !process.argv[3].includes('CS_PAT'))) {
  throw 'Variável de ambiente CS_PAT é obrigatória.'
}
const cs_path = process.env['CS_PAT'] || process.argv[3].split('=')[1];

const contentAndoid = fsa.readFileSync('android/build.gradle', {
  encoding: 'UTF-8'
});

fsa.writeFileSync('android/build.gradle', contentAndoid.replace('CS_PAT', cs_path));

const contentIos = fsa.readFileSync('CapacitorLivenessCs.podspec', {
  encoding: 'UTF-8'
});
fsa.writeFileSync('CapacitorLivenessCs.podspec', contentIos.replace('CS_PAT', cs_path));

execSync(`git clone https://CS-Package:${cs_path}@dev.azure.com/CS-Package/ID-Lab-PackagesSDK/_git/CSLivenessSDK --branch 1.1.4 LocalCSLivenessSDK`)
