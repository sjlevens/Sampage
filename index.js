const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const projectData = JSON.parse(json);

const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    //  PROJECT OVERVIEW
    if (pathName === '/projects' || pathName === '/'){
        res.writeHead(200, { 'Content-type': 'text/html'});
        //console.log('Hello');
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;

            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {

                const cardOutput = projectData.map(el => replaceTemplate(data, el)).join('');
                console.log(cardOutput);
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardOutput);
                res.end(overviewOutput)
    
            });
        });

    }
    //  PROJECT PAGE
    else if (pathName === '/project' && id < projectData.length && id >= 0){
        res.writeHead(200, { 'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-project.html`, 'utf-8', (err, data) => {
            const project = projectData[id];
            const output = replaceTemplate(data, project);
            res.end(output);
        });

    }
    // IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg'});
            res.end(data);
        });

    }
    //  404 ERROR
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('404');
    }

});

server.listen(1337, '127.0.0.1', () => {
    console.log('listening for reqs');

});

function replaceTemplate(originalHTML, project){
    let output = originalHTML.replace(/{%PROJECTNAME%}/g, project.projectName);
    output = output.replace(/{%DATE%}/g, project.date);
    output = output.replace(/{%IMAGE%}/g, project.img);
    output = output.replace(/{%LINK%}/g, project.link);
    output = output.replace(/{%LANGUAGE%}/g, project.language);
    output = output.replace(/{%DESCRIPTION%}/g, project.description);
    output = output.replace(/{%ID%}/g, project.id);

    return output;
}