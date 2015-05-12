/// <reference path="../src-typings/puts.d.ts" />


import native = require('puts/native');
new native.Error();
import * as native2 from 'puts/native';
new native2.Error();

import {HttpError} from 'puts/http';
new HttpError(404);//

import {JSONParseError} from 'puts';
new JSONParseError();