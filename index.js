import * as Rivet from '@ironclad/rivet-node';
import RivetPluginFs from "rivet-plugin-fs";
import express from 'express';
import bodyParser from 'body-parser';
import { plugins as rivetPlugins } from '@ironclad/rivet-core';
import 'dotenv/config';


Rivet.globalRivetNodeRegistry.registerPlugin(RivetPluginFs(Rivet));

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/task-generator', async (req, res) => {
  const post = req.body;

  const inputs = {
    task: { type: 'string', value: post.task },
    filament: { type: 'string', value: post.filament.toString() },
    test: { type: 'string', value: post.test.toString() },
  };

  await taskGenerator(res, inputs);

});

app.post('/filament-fabricator-block-maker', async (req, res) => {
  const post = req.body;

  const inputs = {
    html: { type: 'string', value: post.html }
  };

  await filamentFabricatorBlockMaker(res, inputs);

});

app.post('/project-quote', async (req, res) => {
  const post = req.body;

  const inputs = {
    html: { type: 'string', value: post.project }
  };

  await aiProject(res, inputs);

});


app.listen(port, () => console.log(`Listening on port ${port}!`));

async function taskGenerator(res, data) {
  const response = await Rivet.runGraphInFile('./Api.rivet-project', {
    graph: 'Flex Code Generator',
    inputs: data,
    openAiKey: process.env.OPEN_API_KEY
  });

  //console.log(response)
  res.send(response.output);
}

async function filamentFabricatorBlockMaker(res, data) {
  await Rivet.runGraphInFile('./Api.rivet-project', {
    graph: 'Filament Fabricator Block Generator',
    externalFunctions: {
      async getHtmlPage() {
        //console.log(data);
        return data.html
      }
    },
    onUserEvent: {
      setFile(data) {
        //console.log(data);
        res.send(data);
      },
    },
    openAiKey: process.env.OPEN_API_KEY

  });
}

async function aiProject(res, data) {
  await Rivet.runGraphInFile('./Api.rivet-project', {
    graph: 'Software Quoting Specialist',
    externalFunctions: {
      async getProject() {
        //console.log(data);
        return data.html
      }
    },
    onUserEvent: {
      setFile(data) {
        //console.log(data);
        res.send(data);
      },
    },
    openAiKey: process.env.OPEN_API_KEY

  });
}