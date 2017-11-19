const paths = {};

paths.source = {};
paths.source.root = 'src';
paths.source.stylesheets = `${paths.source.root}/stylesheets`;
paths.source.javascripts = `${paths.source.root}/javascripts`;

paths.dest = {};
paths.dest.root = 'static/assets';
paths.dest.stylesheets = `${paths.dest.root}/stylesheets`;
paths.dest.javascripts = `${paths.dest.root}/javascripts`;

paths.nodeModules = {};
paths.nodeModules.root = 'node_modules';

module.exports = paths;
