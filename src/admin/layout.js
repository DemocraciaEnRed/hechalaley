const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Admin | Hecha la Ley</title>
    <link rel="stylesheet" href="/admin.css" />
  </head>
  <body>
    <div id="root" />
    <script src="/admin.js" />
  </body>
</html>`.replace(/(\s){2,}/g, '').replace(/\n/g, '')

module.exports = function renderLayout (req, res, next) {
  res.set('Content-Type', 'text/html')
  res.send(new Buffer(html))
}
