const fs = require('fs-extra');
const HTMLHint = require('htmlhint').default; // https://github.com/htmlhint/HTMLHint
const pretty = require('pretty'); // https://github.com/jonschlinkert/pretty

const src = process.argv[2];
const outPath = src.replace(/src\b/, 'dist');
const rules = {
  "fullname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "doctype-first": true,
  "tag-pair": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "attr-no-duplication": true,
  "title-require": true
};
const prettyOpts = {
  unformatted: [
    'code',
    'pre',
    'em',
    'strong',
    'span',
    'br',
    'script'
  ]
};
const includePattern = /<!--\s*include\s+(.*?)\s*-->/ig;
let matches = [];
let match;
let pending;

function writeHTML(data) {
  data = pretty(data, prettyOpts); // auto-format
  fs.outputFile(outPath, data);
}

function readHTML() {
  fs.readFile(src, 'utf8', (err, data) => {
    if (err)
      throw err;

    // error check
    const report = HTMLHint.verify(data, rules);
    if (report.length > 0) {
      console.log(`\x1b[35mHTML errors found on: ${src}\x1b[0m`);
      report.forEach(hint => {
        console.log(`  ${hint.line}:${hint.col} ${hint.message}`);
      });
    } else {
      console.log(`\x1b[35mSuccess on: ${src}\x1b[0m`);
    }
    // look for inline js include comments
    while ((match = includePattern.exec(data)) !== null) {
      matches.push({full: match[0], path: match[1]});
    }
    let i = pending = matches.length;
    if (i > 0) {
      while (i--) {
        const full = matches[i].full;
        const path = matches[i].path;
        const ext = path.split('.').pop();
        const tags = {
          js: ['<script>\n', '\n    </script>'],
          css: ['<style>\n', '\n    </style>'],
          svg: ['', ''],
          html: ['', '']
        };
        fs.readFile(path, (e, contents) => {
          let inline;
          if (e) {
            console.log(`readFile error: ${e.path}`);
            inline = `<!-- FILE NOT FOUND: ${path} -->`;
          } else if(!tags[ext]) {
            inline = `<!-- UNSUPPORTED FILE TYPE: ${path} -->`;
          } else {
            console.log(`include: ${path}`);
            inline = `${tags[ext][0]}${contents}${tags[ext][1]}`;
          }
          data = data.replace(full, inline);
          pending--;
          if (pending < 1)
            writeHTML(data);
          }
        );
      }
    } else {
      writeHTML(data);
    }
  });
}

readHTML();
