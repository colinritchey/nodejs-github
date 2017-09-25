const fs = require('fs')
const qs = require('querystring')
const http = require('http')
const https = require('https')

function optionFn (username) {
  return {
    hostname: `api.github.com`,
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': 'github-grabber'
    }
  }
}

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''


    req.on('data', d => {
      body += d
    })

    req.on('end', () => {
      const username = qs.parse(body).username
      const ws = fs.createWriteStream(`./${username}_starred_repos.txt`)
      const options = optionFn(username)

      https.get(options, function (github_res) {
        let data = "";

        github_res.on("data", function (chunk) {
          data += chunk;
        });

        github_res.on("end", function () {
          let repos = JSON.parse(data).map(repo => {
            return `Repo: ${repo.name}. Stars: ${repo.stargazers_count}.`
          }).join('\n');

          ws.write(repos)
          res.end(repos)
        });
      })
    })

  }
})

githubServer.listen(8080, () => console.log('Listening on 8080'))
