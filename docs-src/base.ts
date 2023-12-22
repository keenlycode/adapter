import {baseLib} from './_base.lib';
baseLib();

import { baseStyle } from './_base.style';
baseStyle('./');

import { baseComponents } from './_base.comp';
baseComponents('./');

import { pageReload } from './_base.esbuild';
pageReload('./');