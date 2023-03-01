// You can import your modules
// import index from '../src/index'

import nock from "nock";
// Requiring our app implementation
import myProbotApp from "../src";
import { Probot, ProbotOctokit } from "probot";
// Requiring our fixtures
import payload from "./fixtures/issues.opened.json";
const issueCreatedBody = { body: "Thanks for opening this issue!" };
const fs = require("fs");
const path =